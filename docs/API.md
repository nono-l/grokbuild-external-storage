# API — `POST php/api/proxy.php`

Content-Type: `application/json`  
認証: ヘッダ `X-Api-Key`（または body `api_key`）  
任意: `Authorization: Basic …`（`BASIC_AUTH_USER` が空でなければ必須）

CORS: `OPTIONS` は認証なし。許可 Origin にだけ `Access-Control-Allow-*` を返す。

## 共通

リクエストは必ず `action` を含む。多くの action は `namespace`（`[a-zA-Z0-9_.:-]{1,64}`）。

成功: `{ "ok": true, … }`  
失敗: `{ "ok": false, "error": "…" }` + 適切な HTTP ステータス。

## Actions

| action | 主な入力 | 結果 |
|--------|----------|------|
| `ping` / `whoami` | — | `service`, `version`, `client_ip`, `week_hits_from_ip` |
| `kv.get` | `key` | `found`, `value`, `updated_at` |
| `kv.set` | `key`, `value` | `saved` |
| `kv.delete` | `key` | `deleted` |
| `kv.list` | — | `items[]` (`key`, `updated_at`) |
| `snap.save` | `title`, `kind`, `payload`, 任意 `id` | `id` |
| `snap.list` | 任意 `kind` | `items[]` |
| `snap.get` | `id` | `found`, `item` |
| `snap.delete` | `id` | `deleted` |
| `log.recent` | 任意 `limit` ≤ 100 | 直近ログ |
| `log.ips` | — | IP 集計 |

## 接続確認（Fuwari リモート管理）

```json
{ "action": "ping", "namespace": "default" }
```

```json
{
  "ok": true,
  "service": "Fuwari REC Remote",
  "client_ip": "203.0.113.10",
  "week_hits_from_ip": 4,
  "time": "2026-08-13T00:00:00Z"
}
```

`client_ip` を setup.php の許可リストに入れる。

## 設定 blob（Fuwari 側の慣習）

`kv.set` の key `settings.latest` に、[`packages/browser-client`](../packages/browser-client/) の `FuwariRemoteSettings` を置く。音声は含めない。
