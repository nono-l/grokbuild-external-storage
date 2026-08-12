<?php
// Non-secret runtime. Keys and DB passwords live in secrets.local.php
// (written by install.php — not in git).

define('DB_CHARSET', 'utf8mb4');
define('DB_OPTIONS', [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
]);

define('APP_ID',      'fuwari');
define('APP_NAME',    'Fuwari REC');
define('APP_VERSION', 'v1.2');
define('APP_EDITION', 'Remote');

define('SHOW_APP_INFO_IN_INSTALLER', true);
define('SHOW_APP_INFO_INPUT_IN_INSTALLER', true);

define('TRUST_PROXY', false);

define('CORS_ORIGINS', [
    'https://fuwa.pachimanzi.uk',
    'https://fuwa-rec.grok.me',
    'http://localhost:8080',
    'http://127.0.0.1:8080',
]);

define('MAX_BODY_BYTES', 512 * 1024);
