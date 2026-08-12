# API — `POST php-api/api/proxy.php`

Hobby コネクタが叩く先。レガシーサーバー上。

認証: `X-Api-Key`。任意で Basic。`OPTIONS` は認証なし。

| action | 用途 |
|--------|------|
| `ping` / `whoami` | 接続確認。`client_ip` |
| `kv.get` / `set` / `list` / `delete` | JSON |
| `snap.*` | 名前付き履歴 |
| `log.recent` / `log.ips` | Hobby 管理画面用 |
