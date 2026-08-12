# Grok Build External Storage

Hobby 枠を超えて使いたい人向け。大きく **二つ**。

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
│     鍵は config.php                 │
│     （install / setup が動的に書く）│
└─────────────────────────────────────┘
```

PHP API は php_installer と同じく **`api/config.php`** が設定の本体です。  
リポジトリの config.php は Sample。本番値はサーバで上書き。

| 半分 | 置く場所 |
|------|----------|
| [`vercel-hobby/`](vercel-hobby/) | Grok Build アプリ |
| [`php-api/`](php-api/) | 共用レンタル |
