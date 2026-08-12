# Hobby アプリからのつなぎ

Vercel には **php-api を置かない**。置くのは `vercel-hobby/` だけ。

1. `connector` を `src/lib/external-storage` などにコピー
2. `admin/external-storage-admin.tsx` を管理ルートに載せる
3. `createConfigStore({ appId: "your-app" })`
4. CORS はレンタル側 `php-api/api/config.php` の `CORS_ORIGINS` に本番 Origin を書く

Hobby / Neon の小さな保存はそのまま。溢れる JSON だけコネクタ経由。
