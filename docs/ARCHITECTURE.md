# アーキテクチャ（Grok Build 共通）

Grok Build アプリはだいたい Vercel に載る。永続 MySQL はホスト側に無い。  
設定・測定結果・スナップショットだけ、ユーザーのレンタルサーバーへ出す。それがこのキット。

## 切り方

```
                 ┌─ php/apps/fuwari.php      （例）
   php/ ─────────┤
   (共通プロキシ) └─ php/apps/myapp.php      ← 新しい Grok Build アプリ
                 ┌─ packages/apps/fuwari
   core-client ──┤
   (共通 fetch)  └─ packages/apps/myapp
```

**共通:** 認証、CORS、KV、スナップショット、接続ログ、IP .htaccess  
**アプリ:** 表示名、許可 Origin、namespace 接頭辞、保存する JSON の形

## データの分かれ方

テーブルは増やさない。namespace で切る。

```
fuwari.default
myapp.alice
another.default
```

`composeNamespace(appId, tenant)` が付与。  
`setup.php` のタイトルだけ `apps/active.php`（そのホストの「顔」）。

## フロント

```ts
import { createConfigStore, remoteKvSet } from "@grokbuild/external-storage";

const store = createConfigStore({ appId: "myapp" });
await remoteKvSet(store.load(), "settings.latest", payload);
```

## デプロイ単位

| 何を配るか | どこへ |
|------------|--------|
| `php/` 一式 | ユーザーのレンタルサーバー |
| フロント SPA | Vercel（Grok Build の成果物） |
| このリポジトリ | キットの正本 |
