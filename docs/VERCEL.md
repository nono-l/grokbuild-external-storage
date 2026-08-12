# Vercel アプリからのつなぎ方

Fuwari REC 本体は Vercel（または同等の静的 / SSR ホスト）に置き、**このリポジトリは置かない**。  
ブラウザがユーザーの `https://…/api/proxy.php` を直接叩きます。

## 環境の切り分け

| 場所 | 持つもの |
|------|----------|
| Vercel | UI・Web Audio・YouTube iframe。**DB 資格情報は置かない** |
| このプロキシ | `DB_*` / `API_KEY` / `CORS_ORIGINS` |
| ユーザーブラウザ | リモート管理タブに貼った URL とキー（localStorage） |

Vercel の Environment Variables に MySQL パスワードを入れる必要はありません。

## CORS

`php/api/config.php` の `CORS_ORIGINS` に、公開中の Origin を列挙する。

```php
define('CORS_ORIGINS', [
    'https://fuwa.pachimanzi.uk',
    'https://YOUR-APP.vercel.app',
    'http://localhost:8080',
]);
```

プレビューデプロイ（`*.vercel.app` が毎回変わる）を許す場合は、プロキシ側でサフィックス許可を足すか、本番ドメインだけにする。ワイルドカード全開はしない。

## クライアント

[`packages/browser-client`](../packages/browser-client/) を Fuwari 本体へコピー、または後で npm 化する。

```ts
import { remotePing } from "./client";

const r = await remotePing({
  proxyUrl: "https://example.com/fuwari/api/proxy.php",
  apiKey: "…",
  namespace: "default",
  basicUser: "",
  basicPass: "",
  setupUrl: "",
  enabled: true,
});
```

## 接続確認フロー

1. ユーザーが Vercel 上の Fuwari → リモート管理 → **接続確認**
2. プロキシが `access_log` に `ping` を書く
3. 応答の `client_ip` を画面表示
4. ユーザーが同じホストの `setup.php` でその IP を許可 → `.htaccess` 書込

Vercel のサーバー IP ではなく、**ブラウザの出口 IP** が見えます。

## デプロイ後にやること（チェック）

- [ ] プロキシが HTTPS
- [ ] `install.php` 実行済み（`install.php.txt` に改名されている）
- [ ] `CORS_ORIGINS` に本番 Origin
- [ ] Fuwari で接続確認が緑
- [ ] （任意）Basic 認証を config と Fuwari の両方に
- [ ] （任意）IP 制限 ON の前に自分の IP を許可リストへ
