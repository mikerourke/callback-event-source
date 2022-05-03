import { startCallbackServer } from "./callbackServer.mjs";
import { startCoreServer } from "./coreServer.mjs";
import { startExportServer } from "./exportServer.mjs";

startServers();

function startServers() {
  startCallbackServer();
  startCoreServer();
  startExportServer();
}
