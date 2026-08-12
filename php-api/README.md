# 2. PHP API — レガシーレンタルサーバー側

このフォルダだけを **HTTPS 対応の古い共用サーバー**（PHP + MySQL）へ置きます。

Vercel には置きません。Hobby の枠の外です。

```
php-api/
├── install.php     自己改名インストーラ
├── setup.php       接続ログ / IP 許可 .htaccess（サーバ管理）
├── api/proxy.php   Hobby コネクタが叩く JSON API
├── apps/           アプリの顔（active.php）
└── install/sql.sql
```

手順: アップロード → `install.php` → 表示された URL / キーを Hobby 管理画面に貼る。
