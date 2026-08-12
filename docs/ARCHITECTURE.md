# アーキテクチャ

## 二段構え

```
 Hobby 内（小さく）          Hobby を超える分
 ┌─────────────────┐        ┌──────────────────────┐
 │ Vercel + Neon   │        │ ユーザー MySQL       │
 │ 設定・認証・少量 │   →    │ grokbuild-external-  │
 │ Blob も少し     │        │ storage (このキット) │
 └─────────────────┘        └──────────────────────┘
```

左を「無い」とは言わない。右は **超えた人向けの拡張**。

## コアとアプリ

```
php/api/proxy.php     共通（KV / snap / ログ / 認証）
php/apps/{id}.php     アプリの顔（CORS・名前）
core-client           どの Grok Build アプリでも同じ fetch
packages/apps/{id}    そのアプリの JSON 型
```

namespace は `{appId}.{tenant}`。テーブルは増やさない。
