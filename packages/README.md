# Packages

Hobby 側の JS コネクタと、レンタルへ置く PHP。PHP は Composer / npm に出さない。

| 名前 | 何 | 置き場 |
|------|----|--------|
| `@grokbuild/external-storage-connector` | Hobby が PHP を叩く JS | [`vercel-hobby/connector`](../vercel-hobby/connector) |
| `@grokbuild/app-fuwari` | Fuwari の顔 | [`vercel-hobby/apps/fuwari`](../vercel-hobby/apps/fuwari) |
| `@grokbuild/app-tmw` | TMW の顔 | [`vercel-hobby/apps/tmw`](../vercel-hobby/apps/tmw) |
| **php-api** | レンタルへフォルダごと置く | [`../php-api`](../php-api) |

php-api は ZIP かフォルダコピー。`install.php` が初期化、`setup.php` が運用。
