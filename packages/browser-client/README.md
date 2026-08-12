# @fuwari/external-storage-client

Fuwari REC のリモート管理タブと同じブラウザクライアントです。  
`fetch` のみ。Node 専用 API は使いません。

```ts
import { remotePing, remoteKvSet } from "./src";

await remotePing(config);
await remoteKvSet(config, "settings.latest", settingsBlob);
```

設定の読み書きキーは Fuwari 本体と合わせて `settings.latest` を推奨。
