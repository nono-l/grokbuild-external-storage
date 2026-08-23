export { TMW_APP } from "./profile";

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
} from "../../connector/src/index";

export type {
  RemoteStoreConfig,
  RemoteKvItem,
  RemoteSnapshotMeta,
  RemoteSnapshot,
  ProxyResult,
  PingResult,
  AccessLogItem,
  AccessIpItem,
} from "../../connector/src/index";

import { createConfigStore } from "../../connector/src/index";
import { TMW_APP } from "./profile";

export function createTmwConfigStore() {
  return createConfigStore({ appId: TMW_APP.id });
}
