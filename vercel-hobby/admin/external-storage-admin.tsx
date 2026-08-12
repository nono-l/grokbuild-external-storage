import { useCallback, useState, type ReactNode } from "react";
import {
  createConfigStore,
  guessSetupUrl,
  remoteLogIps,
  remoteLogRecent,
  remotePing,
  remoteSnapList,
  type AccessIpItem,
  type AccessLogItem,
  type RemoteSnapshotMeta,
  type RemoteStoreConfig,
} from "../connector/src";

export type ExternalStorageAdminProps = {
  appId: string;
  appName?: string;
  /** App-specific push/pull (settings JSON). Connector does not know the shape. */
  onPushSettings?: (config: RemoteStoreConfig) => Promise<void>;
  onPullSettings?: (config: RemoteStoreConfig) => Promise<void>;
  extra?: ReactNode;
};

/**
 * Vercel Hobby に載せる管理画面。
 * 接続確認・IP・ログ。保存の中身はアプリが callback で渡す。
 */
export function ExternalStorageAdmin({
  appId,
  appName,
  onPushSettings,
  onPullSettings,
  extra,
}: ExternalStorageAdminProps) {
  const store = createConfigStore({ appId });
  const [config, setConfig] = useState<RemoteStoreConfig>(() => store.load());
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [connected, setConnected] = useState<boolean | null>(null);
  const [clientIp, setClientIp] = useState<string | null>(null);
  const [lastCheckAt, setLastCheckAt] = useState<string | null>(null);
  const [serviceInfo, setServiceInfo] = useState<string | null>(null);
  const [logs, setLogs] = useState<AccessLogItem[]>([]);
  const [ipStats, setIpStats] = useState<AccessIpItem[]>([]);
  const [snaps, setSnaps] = useState<RemoteSnapshotMeta[]>([]);

  const persist = useCallback(
    (next: RemoteStoreConfig) => {
      const withApp = { ...next, appId };
      setConfig(withApp);
      store.save(withApp);
    },
    [appId, store],
  );

  const setupHref =
    config.setupUrl.trim() ||
    (config.proxyUrl.trim() ? guessSetupUrl(config.proxyUrl) : "");

  const refreshMeta = async (cfg: RemoteStoreConfig) => {
    const [lr, ir, sr] = await Promise.all([
      remoteLogRecent(cfg, 15),
      remoteLogIps(cfg),
      remoteSnapList(cfg),
    ]);
    if (lr.ok) {
      setLogs(lr.data.items ?? []);
      if (lr.data.your_ip) setClientIp(lr.data.your_ip);
    }
    if (ir.ok) setIpStats(ir.data.items ?? []);
    if (sr.ok) setSnaps(sr.data.items ?? []);
  };

  const test = async () => {
    setBusy(true);
    setStatus("接続確認中…");
    const r = await remotePing(config);
    setBusy(false);
    setLastCheckAt(new Date().toLocaleString("ja-JP"));
    if (r.ok) {
      setConnected(true);
      setClientIp(r.data.client_ip ?? null);
      setServiceInfo(
        [r.data.service, r.data.app_id, r.data.version]
          .filter(Boolean)
          .join(" · ") || null,
      );
      setStatus("接続できました。php-api の access_log に残っています。");
      await refreshMeta(config);
    } else {
      setConnected(false);
      setStatus(`接続失敗: ${r.error}`);
    }
  };

  return (
    <div className="space-y-4 text-sm">
      <header className="rounded-2xl border border-border bg-card p-4">
        <p className="text-[11px] text-muted-foreground">
          Grok Build · Vercel Hobby コネクタ
        </p>
        <h2 className="mt-1 text-base font-semibold">
          {appName ?? appId} · 外部ストレージ
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Hobby / Neon を小さく使ったうえで、溢れる分だけレガシーサーバーの PHP
          API へ出します。
        </p>

        <div
          className={`mt-4 grid gap-3 rounded-xl border p-3 sm:grid-cols-3 ${
            connected === true
              ? "border-primary/30 bg-primary/5"
              : connected === false
                ? "border-red-300/40 bg-red-50/50"
                : "border-border bg-muted/30"
          }`}
        >
          <div>
            <div className="text-[11px] text-muted-foreground">接続</div>
            <div className="font-semibold">
              {connected === true
                ? "OK"
                : connected === false
                  ? "失敗"
                  : "未確認"}
            </div>
            {lastCheckAt && (
              <div className="text-[10px] text-muted-foreground">
                {lastCheckAt}
              </div>
            )}
          </div>
          <div>
            <div className="text-[11px] text-muted-foreground">
              プロキシが見た IP
            </div>
            <div className="font-mono font-semibold">{clientIp ?? "—"}</div>
          </div>
          <div>
            <div className="text-[11px] text-muted-foreground">サービス</div>
            <div className="truncate">{serviceInfo ?? "—"}</div>
            {setupHref && (
              <a
                href={setupHref}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-primary underline"
              >
                php-api setup.php
              </a>
            )}
          </div>
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <label className="text-xs text-muted-foreground sm:col-span-2">
            PHP API URL（…/api/proxy.php）
            <input
              className="mt-1 w-full rounded-xl border border-border bg-muted/40 px-3 py-2"
              value={config.proxyUrl}
              onChange={(e) => persist({ ...config, proxyUrl: e.target.value })}
              placeholder="https://example.com/xstore/api/proxy.php"
            />
          </label>
          <label className="text-xs text-muted-foreground">
            API キー
            <input
              type="password"
              className="mt-1 w-full rounded-xl border border-border bg-muted/40 px-3 py-2"
              value={config.apiKey}
              onChange={(e) => persist({ ...config, apiKey: e.target.value })}
            />
          </label>
          <label className="text-xs text-muted-foreground">
            テナント（namespace）
            <input
              className="mt-1 w-full rounded-xl border border-border bg-muted/40 px-3 py-2"
              value={config.namespace}
              onChange={(e) =>
                persist({ ...config, namespace: e.target.value })
              }
            />
          </label>
          <label className="text-xs text-muted-foreground">
            Basic ユーザー（任意）
            <input
              className="mt-1 w-full rounded-xl border border-border bg-muted/40 px-3 py-2"
              value={config.basicUser}
              onChange={(e) =>
                persist({ ...config, basicUser: e.target.value })
              }
            />
          </label>
          <label className="text-xs text-muted-foreground">
            Basic パスワード
            <input
              type="password"
              className="mt-1 w-full rounded-xl border border-border bg-muted/40 px-3 py-2"
              value={config.basicPass}
              onChange={(e) =>
                persist({ ...config, basicPass: e.target.value })
              }
            />
          </label>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            disabled={busy || !config.enabled}
            onClick={() => void test()}
            className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground disabled:opacity-50"
          >
            {busy ? "確認中…" : "接続確認"}
          </button>
          <label className="inline-flex items-center gap-2 text-xs">
            <input
              type="checkbox"
              checked={config.enabled}
              onChange={(e) => persist({ ...config, enabled: e.target.checked })}
            />
            コネクタを有効
          </label>
          {onPushSettings && (
            <button
              type="button"
              disabled={busy || !config.enabled}
              onClick={() => void onPushSettings(config)}
              className="rounded-full border border-border px-3 py-2 text-xs"
            >
              設定をアップロード
            </button>
          )}
          {onPullSettings && (
            <button
              type="button"
              disabled={busy || !config.enabled}
              onClick={() => void onPullSettings(config)}
              className="rounded-full border border-border px-3 py-2 text-xs"
            >
              設定をダウンロード
            </button>
          )}
        </div>
        {status && (
          <p className="mt-2 text-xs text-muted-foreground">{status}</p>
        )}
      </header>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-4">
          <h3 className="font-semibold">接続元 IP</h3>
          <ul className="mt-2 max-h-48 space-y-1 overflow-y-auto font-mono text-[11px]">
            {ipStats.length === 0 && (
              <li className="text-muted-foreground">接続確認後に出ます</li>
            )}
            {ipStats.map((row) => (
              <li key={row.ip}>
                {row.ip}
                {row.ip === clientIp ? " ← この端末" : ""} · {row.hits}回
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4">
          <h3 className="font-semibold">直近ログ</h3>
          <ul className="mt-2 max-h-48 space-y-1 overflow-y-auto text-[11px]">
            {logs.length === 0 && (
              <li className="text-muted-foreground">ログなし</li>
            )}
            {logs.map((row) => (
              <li key={row.id}>
                {row.ip} · {row.action} · {row.ok ? "OK" : "NG"}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {snaps.length > 0 && (
        <section className="rounded-2xl border border-border bg-card p-4">
          <h3 className="font-semibold">スナップショット（サーバ上）</h3>
          <ul className="mt-2 text-xs">
            {snaps.map((s) => (
              <li key={s.id}>
                #{s.id} {s.title} · {s.kind}
              </li>
            ))}
          </ul>
        </section>
      )}

      {extra}
    </div>
  );
}
