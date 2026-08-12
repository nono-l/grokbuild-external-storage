# Grok Build External Storage

Grok Build で作った **Vercel 上のアプリ** が、ユーザー自身の MySQL に JSON だけ出すための共通キットです。

特定アプリ（Fuwari など）専用ではありません。  
**コア + アプリプロファイル** で、同じプロキシを何本の SPA からでも使えます。

```
[ Grok Build app on Vercel ]
        │  POST JSON + X-Api-Key
        ▼
[ php/api/proxy.php ]     ← このリポジトリの共通コア
        │
        ▼
[ MySQL kv / snapshots / log ]
   namespace = {appId}.{tenant}
```

## 層

| 層 | パス | 中身 |
|----|------|------|
| **コア PHP** | [`php/`](php/) | install / proxy / setup。action は共通 |
| **アプリ PHP** | [`php/apps/`](php/apps/) | 名前・CORS・接頭辞。`active.php` で選択 |
| **コア TS** | [`packages/core-client/`](packages/core-client/) | ping / kv / snap / ログ |
| **アプリ TS** | [`packages/apps/{id}/`](packages/apps/) | そのアプリの設定 JSON 型 |

付属の `fuwari` は **プロファイルの実装例** です。別の Grok Build アプリは `php/apps/_template.php` から足します。

## ドキュメント

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — なぜこう切るか
- [docs/ADDING_AN_APP.md](docs/ADDING_AN_APP.md) — アプリの足し方
- [docs/API.md](docs/API.md) — action 一覧
- [docs/SECURITY.md](docs/SECURITY.md)
- [docs/VERCEL.md](docs/VERCEL.md)

## 最短

1. `php/` を HTTPS ホストへ
2. `php/apps/active.php` が欲しいアプリを指しているか確認
3. `install.php` → クライアントに URL / API キー
4. フロントは `createConfigStore({ appId: "your-app" })`

同じ MySQL に別アプリを足すときはプロファイルを追加するだけ。テーブルは増やしません。
