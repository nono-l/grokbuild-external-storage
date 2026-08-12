# 計画: Grok Build 外部ストレージ

Grok Build で作るアプリ全般向け。切り方は [ARCHITECTURE.md](./ARCHITECTURE.md)、追加は [ADDING_AN_APP.md](./ADDING_AN_APP.md)。

## 問題

- 成果物は Vercel に載る（永続 MySQL なし）
- それでも設定や測定結果は端末をまたぎたい
- アプリごとにプロキシをフォークしたくない

## 方針

ユーザー HTTPS ホストに **アプリ非依存の JSON プロキシ** を 1 本置く。  
アプリ差は `apps/{id}.php` とクライアントの型だけ。

保存する: JSON 設定・スナップショット・接続ログ  
保存しない: バイナリ（音声・動画）・生 SQL
