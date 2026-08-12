# アプリを足す

コア（PHP プロキシ + `core-client`）はアプリを知りません。  
足すものは **プロファイル 2 枚** だけです。

```
php/apps/{id}.php          ← サーバ側の名前・CORS・namespace 接頭辞
packages/apps/{id}/        ← フロントの設定型とキー
```

## 1. PHP プロファイル

```bash
cp php/apps/_template.php php/apps/myapp.php
```

`id` / `name` / `cors` / `namespace_prefix` を書く。

`php/apps/active.php` を差し替え:

```php
<?php
return require __DIR__ . '/myapp.php';
```

同じ MySQL に複数アプリを載せる場合、`active.php` はホストの「顔」（install / setup のタイトル）だけ。  
データ分離は **namespace = `{appId}.{tenant}`**（クライアントが自動付与）。

## 2. フロント

```bash
cp -r packages/apps/_template packages/apps/myapp
```

`profile.ts` に設定 JSON の型を書く。`createConfigStore({ appId: "myapp" })` で localStorage キーも分かれる。

## 3. 触らなくてよいもの

- `api/proxy.php` の action
- テーブル定義（kv / snapshots / log は共通）
- 認証・IP 制限・Basic

Fuwari はその一例（`php/apps/fuwari.php` + `packages/apps/fuwari`）です。
