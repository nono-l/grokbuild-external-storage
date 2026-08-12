# Grok Build External Storage

Hobby 枠を超えて使いたい人向けの拡張です。大きく **二つ** に分かれます。

```
┌─────────────────────────────────────┐
│  1. Vercel Hobby に組み込む         │
│     連携コネクタ + 管理画面         │
│     vercel-hobby/                   │
└─────────────────┬───────────────────┘
                  │ 溢れる分だけ POST JSON
                  ▼
┌─────────────────────────────────────┐
│  2. レガシーレンタルサーバー        │
│     PHP API + MySQL                 │
│     php-api/                        │
└─────────────────────────────────────┘
```

デフォルトは Vercel Hobby + Neon を小さく使う。  
超える人には「それなら自分のストレージへ」— それが 2 です。

| 半分 | 置く場所 | 中身 |
|------|----------|------|
| [`vercel-hobby/`](vercel-hobby/) | Grok Build アプリ（Vercel） | コネクタ・管理画面・アプリ型 |
| [`php-api/`](php-api/) | 共用レンタル（PHP + MySQL） | install / proxy / setup |

## ドキュメント

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- [docs/ADDING_AN_APP.md](docs/ADDING_AN_APP.md)
- [docs/API.md](docs/API.md) — `php-api/api/proxy.php`
- [docs/SECURITY.md](docs/SECURITY.md)
- [docs/VERCEL.md](docs/VERCEL.md)

## 流れ

1. `php-api/` をレンタルサーバーへ → `install.php`
2. アプリに `vercel-hobby/connector` と `admin` を組み込む
3. 管理画面で接続確認。IP を絞るならサーバの `setup.php`
