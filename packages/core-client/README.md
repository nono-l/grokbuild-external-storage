# `@grokbuild/external-storage`

Grok Build アプリ共通のブラウザクライアント。KV / スナップショット / ping / ログ。

```ts
import { createConfigStore, remotePing } from "./src";

const store = createConfigStore({ appId: "myapp" });
await remotePing(store.load()); // namespace → myapp.default
```

ペイロードの型はここには置かない。`packages/apps/{id}` を見る。
