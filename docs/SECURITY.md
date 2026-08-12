# セキュリティ

重ねがけ前提。どれか一つを「金庫」だと思わない。

| 層 | 効く相手 | 限界 |
|----|----------|------|
| HTTPS | 通信の盗聴 | ホスト侵害には無力 |
| CORS | 他 Origin のブラウザ JS | curl は止めない |
| API_KEY | 鍵を知らない人 | フロントに貼るので漏洩しうる |
| Basic 認証 | URL スキャン・bot | HTTPS 必須。おまじない程度 |
| IP `.htaccess` | 許可外のネット全体 | モバイル回線は IP が変わる |
| 生 SQL 禁止 | インジェクション面 | アプリバグは別 |

## 鍵の置き場

- `API_KEY` / `ADMIN_KEY` / `DB_PASS` は `php/api/config.php` のみ
- `api/.htaccess` が `config.php` と `bootstrap.php` の直アクセスを拒否
- `dlzip.php` は `DB_*` と `API_KEY` をマスクして ZIP 化
- リポジトリの `config.php` は Sample 値のままコミットする（本物を上げない）

## Basic 認証

`config.php`:

```php
define('BASIC_AUTH_USER', 'fuwari');
define('BASIC_AUTH_PASS', '長いランダム');
```

空ならオフ。有効時は Fuwari リモート管理の「Basic 認証」欄に同じ値。  
`OPTIONS` は認証しない（CORS プリフライト）。

## IP 制限

`setup.php` → 接続ログから「許可へ」→ **IP制限を ON にして書込**。  
対象は `proxy.php` のみ。`setup.php` は ADMIN_KEY で守る。

制限 ON の前に自分の IP がリストに無いと、接続確認も含め全員拒否になる。

## TRUST_PROXY

リバースプロキシ背後だけで `true`。`X-Forwarded-For` を無条件に信じると IP 詐称できる。
