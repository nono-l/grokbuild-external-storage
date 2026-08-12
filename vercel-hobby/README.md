# 1. Vercel Hobby 側 — 連携コネクタと管理画面

接続鍵（API キー / Basic）は **Neon にユーザー単位で動的保存**します。
ソースにも localStorage にも置きません。

| パス | 役割 |
|------|------|
| [`connector/`](connector/) | `fetch` クライアント |
| [`connector/migrations/`](connector/migrations/) | Neon テーブル |
| [`admin/`](admin/) | アプリに載せる接続管理画面 |
| [`apps/`](apps/) | アプリプロファイル |
