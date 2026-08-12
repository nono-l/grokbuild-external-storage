# Hobby 連携コネクタ

Vercel Hobby 上の Grok Build アプリに組み込む **ブラウザ側クライアント**です。

Neon / Hobby の小さな枠はそのまま。溢れる分だけ `php-api` の `proxy.php` を叩きます。

```ts
import { createConfigStore, remotePing, remoteKvSet } from "./src";

const store = createConfigStore({ appId: "myapp" });
const config = store.load();
await remotePing(config);
await remoteKvSet(config, "settings.latest", payload);
```

管理画面は隣の [`../admin`](../admin)。
