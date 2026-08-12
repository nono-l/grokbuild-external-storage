export { FUWARI_APP, type FuwariRemoteSettings } from "./profile";

export {
  createConfigStore,
  guessSetupUrl,
  composeNamespace,
  callRemoteProxy,
  remotePing,
  remoteLogRecent,
  remoteLogIps,
  remoteKvGet,
  remoteKvSet,
  remoteKvList,
  remoteSnapSave,
  remoteSnapList,
  remoteSnapGet,
  remoteSnapDelete,
} from "../../core-client/src/index";

export type {
  RemoteStoreConfig,
  RemoteKvItem,
  RemoteSnapshotMeta,
  RemoteSnapshot,
  ProxyResult,
  PingResult,
  AccessLogItem,
  AccessIpItem,
} from "../../core-client/src/index";

import { createConfigStore } from "../../core-client/src/index";
import { FUWARI_APP } from "./profile";

/** Fuwari 用に appId を固定した config store */
export function createFuwariConfigStore() {
  return createConfigStore({ appId: FUWARI_APP.id });
}
