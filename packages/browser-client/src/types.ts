export type RemoteStoreConfig = {
  /** Full URL to proxy.php */
  proxyUrl: string;
  /** Shared secret (X-Api-Key) */
  apiKey: string;
  /** Optional HTTP Basic user (HTTPS おまじない層) */
  basicUser: string;
  /** Optional HTTP Basic password */
  basicPass: string;
  /** Logical tenant / user bucket */
  namespace: string;
  /** Optional link to server setup.php (for operator) */
  setupUrl: string;
  /** When true, UI offers sync buttons */
  enabled: boolean;
};

export type RemoteKvItem = {
  key: string;
  updated_at: string;
};

export type RemoteSnapshotMeta = {
  id: number;
  title: string;
  kind: string;
  updated_at: string;
  created_at: string;
};

export type RemoteSnapshot = RemoteSnapshotMeta & {
  payload: unknown;
};

/** What we push as a “settings” blob */
export type FuwariRemoteSettings = {
  version: 1;
  savedAt: string;
  master: {
    volume: number;
    pitchSemitones: number;
    formantDb: number;
    reverbMix: number;
    compressor: number;
    preset: string;
  };
  range?: {
    minHz: number | null;
    maxHz: number | null;
    minNote: string | null;
    maxNote: string | null;
  };
  mediaRange?: {
    minNote: string;
    maxNote: string;
    minHz: number;
    maxHz: number;
    spanSemitones: number;
    trackName: string;
    usedVocalIsolation: boolean;
  } | null;
  bpm: number;
};

export const DEFAULT_REMOTE_CONFIG: RemoteStoreConfig = {
  proxyUrl: "",
  apiKey: "",
  basicUser: "",
  basicPass: "",
  namespace: "default",
  setupUrl: "",
  enabled: false,
};

export const REMOTE_CONFIG_STORAGE_KEY = "fuwari.remote-store.config.v1";
