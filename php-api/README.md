# 2. PHP API — レガシーレンタルサーバー側

このフォルダを HTTPS + PHP + MySQL へ置く。

設定の本体は **`api/config.php`**（php_installer と同じ）。  
`install.php` が Sample を本番値で上書きする。ソースには本物を載せない。

```
php-api/
├── install.php      → api/config.php を動的生成
├── setup.php        → 同じ config.php を更新
├── api/config.php   Sample（リポジトリ） / 本番（サーバ）
└── api/proxy.php
```
