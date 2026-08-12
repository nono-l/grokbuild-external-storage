# Hobby 管理画面

Vercel アプリに埋め込む **接続管理 UI** です。

- プロキシ URL / API キー / Basic
- 接続確認（php-api の `access_log` に残る）
- プロキシが見た IP
- 設定のアップ／ダウンはアプリが callback で渡す

```tsx
import { ExternalStorageAdmin } from "./external-storage-admin";

<ExternalStorageAdmin
  appId="fuwari"
  appName="Fuwari REC"
  onPushSettings={async (cfg) => { /* remoteKvSet(cfg, key, blob) */ }}
  onPullSettings={async (cfg) => { /* remoteKvGet + apply */ }}
/>
```

PHP 側の監視 UI は `php-api/setup.php`（レンタルサーバー）。こちらは Hobby アプリの中。
