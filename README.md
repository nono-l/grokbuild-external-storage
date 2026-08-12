# Grok Build External Storage

Grok Build アプリの **Hobby 枠を超えて使いたい人向け**の拡張です。

デプロイ先（Vercel Hobby + Neon など）にも小さな DB / Blob はあります。  
設定やスコア程度ならそれで足ります。枠を大きく食う使い方をしたいときは、

> それなら **自分のストレージ** に保存してください

という逃げ道がこのキットです。Vercel 側の無料枠を食い潰しません。

```
[ Grok Build app · Vercel Hobby + Neon（小さく使う） ]
        │
        │  Hobby を超える分
        ▼
[ ユーザーの HTTPS + MySQL ]
   php/api/proxy.php
   namespace = {appId}.{tenant}
```

## いつ使うか

| これで足りる | これを出す |
|--------------|------------|
| MIX・スコア・小さな JSON | 枠を超える保存量・履歴 |
| サインイン用の小さな行 | 自分の MySQL に置きたい |
| Hobby の範囲の個人利用 | 録音メタを長く残す、複数アプリで共有 |

録音 WAV や動画そのものは、どちらにも置かない想定です。

## 層

| 層 | パス | 中身 |
|----|------|------|
| **コア PHP** | [`php/`](php/) | install / proxy / setup |
| **アプリ PHP** | [`php/apps/`](php/apps/) | 名前・CORS。`active.php` で選択 |
| **コア TS** | [`packages/core-client/`](packages/core-client/) | ping / kv / snap / ログ |
| **アプリ TS** | [`packages/apps/{id}/`](packages/apps/) | そのアプリの JSON 型 |

`fuwari` はプロファイルの実装例です。

## ドキュメント

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- [docs/ADDING_AN_APP.md](docs/ADDING_AN_APP.md)
- [docs/API.md](docs/API.md)
- [docs/SECURITY.md](docs/SECURITY.md)
- [docs/VERCEL.md](docs/VERCEL.md)

## 最短

1. `php/` を HTTPS ホストへ
2. `install.php` → URL と API キー
3. アプリの「リモート管理」相当で接続確認
4. Hobby 内のデータはそのまま Vercel / Neon、溢れる分だけこちら
