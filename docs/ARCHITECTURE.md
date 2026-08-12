# アーキテクチャ（共通化）

## 切り方

```
                 ┌─ php/apps/fuwari.php
   php/ ─────────┤
   (共通プロキシ) └─ php/apps/myapp.php     ← 差し替え・追加
                 ┌─ packages/apps/fuwari
   core-client ──┤
   (共通 fetch)  └─ packages/apps/myapp    ← 設定型だけ
```

**共通:** 認証、CORS、KV、スナップショット、接続ログ、IP .htaccess  
**アプリ:** 表示名、許可 Origin、namespace 接頭辞、保存する JSON の形

## なぜ Fuwari 専用にしないか

- php_installer 型は他アプリでも同じ
- Vercel に載せた別 SPA も「設定だけ遠隔 MySQL」が欲しい
- 1 本の `proxy.php` をフォークせずに済む

## データの分かれ方

テーブルは増やさない。namespace で切る。

```
fuwari.default      Fuwari のデフォルトテナント
fuwari.alice
myapp.default
```

クライアントの `composeNamespace(appId, tenant)` が付与する。  
`setup.php` のタイトルだけ `apps/active.php`（そのホストの「顔」）。

## フロントの置き方

```ts
// どのアプリでも
import { createConfigStore, remoteKvSet } from "@xstore/core-client";

const store = createConfigStore({ appId: "myapp" });
await remoteKvSet(store.load(), "settings.latest", payload);
```

```ts
// Fuwari だけ追加で型を持つ
import type { FuwariRemoteSettings } from "@xstore/app-fuwari";
```

Fuwari 本体は `src/lib/remote-store` がこのパッケージと同じ切り方（`core/` + `app.ts`）。

## デプロイ単位

| 何を配るか | どこへ |
|------------|--------|
| `php/` 一式 | ユーザーのレンタルサーバー |
| フロント SPA | Vercel |
| このリポジトリ | 計画と実装の正本 |
