# php/ — デプロイ用パッケージ

このフォルダだけを HTTPS 対応の PHP + MySQL ホストへアップロードします。

```
php/
├── install.php          # 自己改名インストーラ
├── setup.php            # 接続ログ / IP 許可 / .htaccess
├── install/sql.sql
├── api/config.php       # DB + API_KEY + CORS + Basic
├── api/proxy.php        # JSON API（Fuwari / Vercel から POST）
├── api/bootstrap.php
├── dlzip.php
└── index.html
```

手順の詳細はリポジトリ直下の [README](../README.md) と [docs/VERCEL.md](../docs/VERCEL.md)。
