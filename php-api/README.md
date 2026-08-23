# `@nono-l/grokbuild-php-api`

レガシーレンタル（HTTPS + PHP + MySQL）へ置くパッケージ。  
Hobby コネクタが叩く先は **`api/proxy.php`**。

設定の本体は **`api/config.php`**（php_installer と同じ）。  
`install.php` が Sample を本番値で上書きする。ソースには本物を載せない。

## パッケージとして入れる

GitHub Packages（npm）:

```bash
npm pack @nono-l/grokbuild-php-api --registry=https://npm.pkg.github.com
tar -xzf nono-l-grokbuild-php-api-*.tgz && mv package php-api
```

Composer（VCS）:

```bash
composer create-project nono-l/grokbuild-php-api php-api \
  --repository='{"type":"vcs","url":"https://github.com/nono-l/grokbuild-external-storage"}'
```

ZIP リリース: [Releases](https://github.com/nono-l/grokbuild-external-storage/releases)

## 設置

1. このフォルダをサーバーへ置く
2. `apps/active.php` を動かすアプリに合わせる（`fuwari.php` / `tmw.php`）
3. ブラウザで `install.php` → DB と API キー
4. Hobby 管理画面に `…/api/proxy.php` とキーを貼る

```
php-api/
├── install.php
├── setup.php
├── api/config.php   Sample（リポジトリ） / 本番（サーバ）
└── api/proxy.php
```
