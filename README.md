# Fuwari External Storage

**Vercel に載った Fuwari REC から、自分の MySQL へ設定を出すための外部ストレージ計画**です。

Vercel のフロントはエフェメラルです。音声バッファはブラウザ内、設定・声域結果・スナップショットだけを **HTTPS JSON プロキシ** 経由でレンタルサーバー上の MySQL に置きます。生 SQL はブラウザに出しません。

```
[ Fuwari REC on Vercel ]
        │  POST JSON + X-Api-Key (+ optional Basic)
        ▼
[ php/api/proxy.php ]  ← このリポジトリを HTTPS ホストへ
        │  PDO プリペアドのみ
        ▼
[ MySQL : kv_store / snapshots / access_log ]
```

## このリポジトリの中身

| パス | 役割 |
|------|------|
| [`docs/PLAN.md`](docs/PLAN.md) | なぜ外部ストレージか・何を保存しないか |
| [`docs/API.md`](docs/API.md) | `proxy.php` の action 仕様 |
| [`docs/VERCEL.md`](docs/VERCEL.md) | Vercel アプリからのつなぎ方 |
| [`docs/SECURITY.md`](docs/SECURITY.md) | API キー / Basic / IP 制限 |
| [`php/`](php/) | **デプロイ用** php_installer 互換パッケージ |
| [`packages/browser-client/`](packages/browser-client/) | Fuwari と同じ TypeScript クライアント |

## 最短セットアップ

1. [`php/`](php/) フォルダごとレンタルサーバーへ（**必ず HTTPS**）
2. ブラウザで `…/install.php` → MySQL 接続 → テーブル作成 → `config.php` 書き込み（自己改名）
3. 表示された **proxy URL** と **API キー** を控える
4. Fuwari REC → **リモート管理** に貼って **接続確認**
5. サーバー `setup.php` で接続元 IP を見て、必要なら許可リスト → `.htaccess` 書込

## 保存するもの / しないもの

| する | しない |
|------|--------|
| MIX プリセット・音量・ピッチ | 録音 WAV / 動画本体 |
| BPM・声域測定結果 | YouTube の音声キャッシュ |
| 名前付き設定スナップショット | 生 SQL・DB パスワード |

## ライセンス

MIT。インストーラ骨格は [php_installer](https://x.com/mss_0337_2024) 互換です。
