# アーキテクチャ — 二つの半分

```
 Vercel Hobby アプリ                    レガシーレンタル
 ┌──────────────────────┐              ┌──────────────────┐
 │ Neon / Blob（小さく） │              │ MySQL            │
 │                      │   JSON       │                  │
 │ connector  ──────────┼─────────────►│ api/proxy.php    │
 │ admin 管理画面       │              │ setup.php        │
 └──────────────────────┘              └──────────────────┘
        vercel-hobby/                         php-api/
```

1. **Hobby 連携** — アプリに組み込む。接続先の設定と確認 UI。  
2. **PHP API** — 古い共用サーバーに置くだけ。生 SQL は受けない。

namespace は `{appId}.{tenant}`。プロキシはアプリを知らない。
