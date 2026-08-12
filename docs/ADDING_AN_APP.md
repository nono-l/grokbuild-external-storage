# アプリを足す（Grok Build 共通）

コア（PHP プロキシ + `core-client`）はアプリを知りません。  
足すものは **プロファイル 2 枚** だけです。

```
php/apps/{id}.php          ← サーバ側の名前・CORS・namespace 接頭辞
packages/apps/{id}/        ← フロントの設定型とキー
```

`{id}` は Grok Build アプリの短い英数字（例: `fuwari`, `todo`, `dashboard`）。

## 1. PHP プロファイル

```bash
cp php/apps/_template.php php/apps/myapp.php
```

`id` / `name` / `cors` / `namespace_prefix` を書く。

`php/apps/active.php` を差し替え（そのホストの管理画面タイトル）:

```php
<?php
return require __DIR__ . '/myapp.php';
```

同じ MySQL に複数アプリを載せる場合、`active.php` は「顔」だけ。  
データ分離は **namespace = `{appId}.{tenant}`**。

## 2. フロント

```bash
cp -r packages/apps/_template packages/apps/myapp
```

`profile.ts` に設定 JSON の型。`createConfigStore({ appId: "myapp" })`。

## 3. 触らなくてよいもの

- `api/proxy.php` の action
- テーブル定義
- 認証・IP 制限・Basic
