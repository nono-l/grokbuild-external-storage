# `@xstore/core-client`

アプリ非依存のブラウザクライアント。KV / スナップショット / ping / ログ。

```ts
import { createConfigStore, remotePing, composeNamespace } from "./src";

const store = createConfigStore({ appId: "fuwari" });
const config = store.load();
await remotePing(config); // namespace → fuwari.default
```

ペイロードの型（MIX など）はここには置かない。`packages/apps/{id}` を見る。
