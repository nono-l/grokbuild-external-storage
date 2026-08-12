<?php
/**
 * Shared helpers for proxy.php / setup.php
 */
declare(strict_types=1);

function fuwari_config_path(): string {
    return __DIR__ . '/config.php';
}

function fuwari_secrets_path(): string {
    return __DIR__ . '/secrets.local.php';
}

function fuwari_load_config(): void {
    $path = fuwari_config_path();
    if (!is_file($path)) {
        throw new RuntimeException('api/config.php がありません。install.php を実行してください。');
    }
    require_once $path;
    $secrets = fuwari_secrets_path();
    if (is_file($secrets)) {
        require_once $secrets;
    }
    if (!defined('API_KEY') || API_KEY === '' || !defined('DB_NAME') || DB_NAME === '') {
        throw new RuntimeException('api/secrets.local.php が未設定です。install.php で動的に書き出してください（ソースには鍵を書きません）。');
    }
}

function fuwari_client_ip(): string {
    // リバースプロキシ背後なら config で TRUST_PROXY true
    if (defined('TRUST_PROXY') && TRUST_PROXY) {
        $xff = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? '';
        if (is_string($xff) && $xff !== '') {
            $parts = array_map('trim', explode(',', $xff));
            if ($parts[0] !== '' && filter_var($parts[0], FILTER_VALIDATE_IP)) {
                return $parts[0];
            }
        }
        $real = $_SERVER['HTTP_X_REAL_IP'] ?? '';
        if (is_string($real) && filter_var($real, FILTER_VALIDATE_IP)) {
            return $real;
        }
    }
    $ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
    return is_string($ip) ? $ip : '0.0.0.0';
}

function fuwari_pdo(): PDO {
    $dsn = sprintf(
        'mysql:host=%s;dbname=%s;charset=%s',
        DB_HOST,
        DB_NAME,
        defined('DB_CHARSET') ? DB_CHARSET : 'utf8mb4'
    );
    return new PDO(
        $dsn,
        DB_USER,
        DB_PASS,
        defined('DB_OPTIONS') ? DB_OPTIONS : [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]
    );
}

function fuwari_log_access(
    PDO $pdo,
    string $action,
    bool $ok = true,
    int $httpStatus = 200,
    ?string $namespace = null,
    ?string $note = null
): void {
    try {
        $st = $pdo->prepare(
            'INSERT INTO access_log (ip, action, ok, http_status, origin, user_agent, namespace, note)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
        );
        $origin = $_SERVER['HTTP_ORIGIN'] ?? null;
        $ua = $_SERVER['HTTP_USER_AGENT'] ?? null;
        if (is_string($ua) && strlen($ua) > 512) {
            $ua = substr($ua, 0, 512);
        }
        $st->execute([
            fuwari_client_ip(),
            substr($action, 0, 48),
            $ok ? 1 : 0,
            $httpStatus,
            is_string($origin) ? substr($origin, 0, 255) : null,
            is_string($ua) ? $ua : null,
            $namespace !== null ? substr($namespace, 0, 64) : null,
            $note !== null ? substr($note, 0, 255) : null,
        ]);
    } catch (Throwable $e) {
        // ログ失敗で本処理は落とさない
    }
}

function fuwari_is_valid_ip(string $ip): bool {
    return (bool)filter_var($ip, FILTER_VALIDATE_IP);
}

/**
 * Build Apache .htaccess for api/ (config deny + optional proxy IP allowlist).
 *
 * @param list<string> $ips
 */
function fuwari_build_proxy_htaccess(array $ips, bool $enforce): string {
    $base = <<<'HTA'
# Fuwari REC Remote — api/.htaccess
# config / bootstrap への直接アクセス禁止
<Files "config.php">
    <IfModule mod_authz_core.c>
        Require all denied
    </IfModule>
    <IfModule !mod_authz_core.c>
        Order Allow,Deny
        Deny from all
    </IfModule>
</Files>

<Files "bootstrap.php">
    <IfModule mod_authz_core.c>
        Require all denied
    </IfModule>
    <IfModule !mod_authz_core.c>
        Order Allow,Deny
        Deny from all
    </IfModule>
</Files>

<Files "secrets.local.php">
    <IfModule mod_authz_core.c>
        Require all denied
    </IfModule>
    <IfModule !mod_authz_core.c>
        Order Allow,Deny
        Deny from all
    </IfModule>
</Files>

<Files "secrets.sample.php">
    <IfModule mod_authz_core.c>
        Require all denied
    </IfModule>
    <IfModule !mod_authz_core.c>
        Order Allow,Deny
        Deny from all
    </IfModule>
</Files>

HTA;

    if (!$enforce) {
        return $base . "\n# BEGIN FUWARI_IP_ALLOWLIST\n# IP 制限オフ（setup.php で有効化）\n# END FUWARI_IP_ALLOWLIST\n";
    }

    $valid = [];
    foreach ($ips as $ip) {
        $ip = trim((string)$ip);
        if (fuwari_is_valid_ip($ip)) {
            $valid[$ip] = true;
        }
    }
    $list = array_keys($valid);
    if (count($list) === 0) {
        return $base . "\n# BEGIN FUWARI_IP_ALLOWLIST\n# 有効 IP が無いため制限を書けません\n# END FUWARI_IP_ALLOWLIST\n";
    }

    $reqLines = [];
    $allowLines = [];
    foreach ($list as $ip) {
        $reqLines[] = '    Require ip ' . $ip;
        $allowLines[] = '    Allow from ' . $ip;
    }
    $req = implode("\n", $reqLines);
    $allow = implode("\n", $allowLines);
    $ts = gmdate('c');

    return $base . <<<HTA

# BEGIN FUWARI_IP_ALLOWLIST
# Generated by setup.php at {$ts}
# proxy.php 以外はこの制限の対象外
<Files "proxy.php">
    <IfModule mod_authz_core.c>
        Require all denied
{$req}
    </IfModule>
    <IfModule !mod_authz_core.c>
        Order Deny,Allow
        Deny from all
{$allow}
    </IfModule>
</Files>
# END FUWARI_IP_ALLOWLIST

HTA;
}

function fuwari_write_api_htaccess(string $content): bool {
    $path = __DIR__ . '/.htaccess';
    return file_put_contents($path, $content) !== false;
}

/** Rewrite secrets.local.php (never commit). Preserves existing DB_* unless overridden. */
function fuwari_write_secrets(array $over): bool {
    $esc = static function (string $s): string {
        return str_replace(["\\", "'"], ["\\\\", "\\'"], $s);
    };
    $get = static function (string $key, string $fallback = '') use ($over): string {
        if (array_key_exists($key, $over)) {
            return (string)$over[$key];
        }
        return defined($key) ? (string)constant($key) : $fallback;
    };
    $body = "<?php\n// GENERATED — do not commit. Written by install/setup.\n"
        . "define('DB_HOST', '" . $esc($get('DB_HOST', 'localhost')) . "');\n"
        . "define('DB_USER', '" . $esc($get('DB_USER')) . "');\n"
        . "define('DB_PASS', '" . $esc($get('DB_PASS')) . "');\n"
        . "define('DB_NAME', '" . $esc($get('DB_NAME')) . "');\n"
        . "define('API_KEY', '" . $esc($get('API_KEY')) . "');\n"
        . "define('ADMIN_KEY', '" . $esc($get('ADMIN_KEY', $get('API_KEY'))) . "');\n"
        . "define('BASIC_AUTH_USER', '" . $esc($get('BASIC_AUTH_USER')) . "');\n"
        . "define('BASIC_AUTH_PASS', '" . $esc($get('BASIC_AUTH_PASS')) . "');\n";
    $path = fuwari_secrets_path();
    $ok = file_put_contents($path, $body) !== false;
    if ($ok) {
        @chmod($path, 0600);
    }
    return $ok;
}

