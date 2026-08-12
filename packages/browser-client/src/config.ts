import {
  DEFAULT_REMOTE_CONFIG,
  REMOTE_CONFIG_STORAGE_KEY,
  type RemoteStoreConfig,
} from "./types";

export function loadRemoteConfig(): RemoteStoreConfig {
  if (typeof window === "undefined") return { ...DEFAULT_REMOTE_CONFIG };
  try {
    const raw = window.localStorage.getItem(REMOTE_CONFIG_STORAGE_KEY);
    if (!raw) return { ...DEFAULT_REMOTE_CONFIG };
    const parsed = JSON.parse(raw) as Partial<RemoteStoreConfig>;
    return {
      ...DEFAULT_REMOTE_CONFIG,
      ...parsed,
      proxyUrl: String(parsed.proxyUrl ?? ""),
      apiKey: String(parsed.apiKey ?? ""),
      basicUser: String(parsed.basicUser ?? ""),
      basicPass: String(parsed.basicPass ?? ""),
      namespace: String(parsed.namespace ?? "default") || "default",
      setupUrl: String(parsed.setupUrl ?? ""),
      enabled: Boolean(parsed.enabled),
    };
  } catch {
    return { ...DEFAULT_REMOTE_CONFIG };
  }
}

export function saveRemoteConfig(config: RemoteStoreConfig): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(
    REMOTE_CONFIG_STORAGE_KEY,
    JSON.stringify({
      proxyUrl: config.proxyUrl.trim(),
      apiKey: config.apiKey,
      basicUser: config.basicUser.trim(),
      basicPass: config.basicPass,
      namespace: config.namespace.trim() || "default",
      setupUrl: config.setupUrl.trim(),
      enabled: config.enabled,
    }),
  );
}

/** Guess setup.php URL from proxy.php URL */
export function guessSetupUrl(proxyUrl: string): string {
  try {
    const u = new URL(proxyUrl.trim());
    u.pathname = u.pathname.replace(/\/api\/proxy\.php$/i, "/setup.php");
    if (!/setup\.php$/i.test(u.pathname)) {
      u.pathname = u.pathname.replace(/\/[^/]*$/, "/setup.php");
    }
    return u.toString();
  } catch {
    return "";
  }
}
