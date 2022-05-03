import express from "express";

import { CALLBACK_SERVER_PORT } from "./constants.mjs";
import { sendEventSourceUpdates } from "./coreServer.mjs";
import { assignMiddlewares } from "./middlewares.mjs";

const app = express();

/**
 * Represents the server that listens on a separate port for when the export
 * action is complete.
 */
export function startCallbackServer() {
  assignMiddlewares(app);

  app.post("/done", () => {
    sendEventSourceUpdates("/some/file/path");
  });

  app.listen(CALLBACK_SERVER_PORT, () => {
    // prettier-ignore
    console.log(`Callback server listening at http://localhost/${CALLBACK_SERVER_PORT}`);
  });
}
