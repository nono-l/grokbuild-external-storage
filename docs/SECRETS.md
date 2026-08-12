# 秘密情報はソースに置かない

```
 Hobby / Neon                         レガシー PHP
 grokbuild_external_connector         api/secrets.local.php
  (ユーザー単位・動的)                  (install / setup が動的生成)
        ▲                                      ▲
        │ ソース・git・localStorage には載せない │
```

| 場所 | 何を置く | 何を置かない |
|------|----------|--------------|
| git | スキーマ・サンプル | API キー、DB パスワード、Basic |
| Neon | サインインユーザーの接続鍵 | アプリのソース |
| `secrets.local.php` | DB / API_KEY / Basic | リポジトリ |
| ブラウザ | メモリ上のフォーム | localStorage に鍵を残さない |

Hobby 管理画面はサインイン必須。未ログインでは Neon に書けません。
PHP 側は `install.php` または `setup.php` が `secrets.local.php` を書き、`.htaccess` で直アクセス拒否。
