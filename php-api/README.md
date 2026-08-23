# php-api — レンタルへ置くだけ

HTTPS + PHP + MySQL のレガシーレンタル向け。Composer も npm も使わない。  
このフォルダをアップロードして、ブラウザで `install.php` を開く。

Hobby コネクタが叩く先は **`api/proxy.php`**。

## 二つの PHP

| ファイル | 役割 | たとえ |
|---------|------|--------|
| **`install.php`** | API サーバーとしての初期設定（DB 接続・テーブル・API キー → `api/config.php`） | OS のインストールメディア |
| **`setup.php`** | 外部接続が始まってからの運用設定（接続ログ・許可 IP・.htaccess） | 入れた OS をどう使うか |

`install.php` は一度きり。完了すると改名されます。そのあと使うのは `setup.php` です。

設定の本体は **`api/config.php`**。install が Sample を本番値で上書きします。ソースには本物を載せない。

## 設置

1. このフォルダをサーバーへ置く（FTP でもファイルマネージャでも）
2. `apps/active.php` を動かすアプリに合わせる（`fuwari.php` / `tmw.php`）
3. **`install.php`** — DB と API キー
4. Hobby 管理画面に `…/api/proxy.php` とキーを貼り、接続テスト
5. **`setup.php`** — 接続元 IP やログなど、使い方の細かい設定

ZIP が欲しければ設置済みサーバの `dlzip.php`、または [Releases](https://github.com/nono-l/grokbuild-external-storage/releases)。

```
php-api/
├── install.php      インストールメディア
├── setup.php        運用設定
├── api/config.php   Sample（リポジトリ） / 本番（サーバ）
└── api/proxy.php
```
