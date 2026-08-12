# 計画: Vercel 外部ストレージ（共通骨格）

詳細な切り方は [ARCHITECTURE.md](./ARCHITECTURE.md)。アプリ追加は [ADDING_AN_APP.md](./ADDING_AN_APP.md)。

## 問題

Vercel 上の SPA は永続 MySQL を持たない。ブラウザ完結のアプリでも、設定や測定結果は端末をまたぎたい。  
Vercel からユーザー MySQL へ生 TCP は出せない。

## 方針

ユーザー HTTPS ホストに **アプリ非依存の JSON プロキシ** を置く。  
アプリ差は `apps/{id}.php` とクライアントの型だけ。

保存する: JSON 設定・スナップショット・接続ログ  
保存しない: 音声・動画・生 SQL
