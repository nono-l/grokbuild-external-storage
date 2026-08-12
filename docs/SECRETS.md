# 秘密情報はソースに置かない

```
 Hobby / Neon                            レガシー PHP
 grokbuild_external_connector            api/config.php
  （ユーザー単位・動的）                   install.php / setup.php が動的に書く
                                           （php_installer と同じ）
```

| 場所 | 役割 |
|------|------|
| git の `config.php` | Sample だけ（`Sample` / `CHANGE_ME`） |
| サーバ上の `config.php` | install が上書き。DB と API_KEY の本番値 |
| Neon | Hobby アプリ側の接続先・鍵（ユーザー単位） |

PHP API は **config.php を使う**。別ファイルに分けない。  
`.htaccess` が `config.php` の直アクセスを拒否する。
