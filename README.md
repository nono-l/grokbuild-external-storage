# Grok Build External Storage

Hobby 枠を超えて使いたい人向けの拡張。大きく **二つ**。

```
┌─────────────────────────────────────┐
│  1. Vercel Hobby                    │
│     コネクタ + 管理画面             │
│     接続鍵は Neon に動的保存        │
└─────────────────┬───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│  2. レガシーレンタル PHP API        │
│     鍵は secrets.local.php          │
│     （install / setup が生成）      │
└─────────────────────────────────────┘
```

**ソースコードに秘密は載せない。** 詳細は [docs/SECRETS.md](docs/SECRETS.md)。

| 半分 | 置く場所 |
|------|----------|
| [`vercel-hobby/`](vercel-hobby/) | Grok Build アプリ |
| [`php-api/`](php-api/) | 共用レンタル |
