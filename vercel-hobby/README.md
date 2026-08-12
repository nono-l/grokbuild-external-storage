# 1. Vercel Hobby 側 — 連携コネクタと管理画面

Grok Build アプリ（Vercel Hobby + Neon）に **組み込む** 半分です。

| パス | 役割 |
|------|------|
| [`connector/`](connector/) | `fetch` クライアント。Hobby から php-api を叩く |
| [`admin/`](admin/) | アプリに載せる接続管理画面 |
| [`apps/`](apps/) | アプリプロファイル（例: fuwari） |

Neon の小さな枠はこれまで通りアプリ本体が使う。  
この半分は「溢れたら自分の PHP API へ」のスイッチと管理です。
