import express from "express";

import { CALLBACK_SERVER_PORT } from "./constants.mjs";
import { sendUpdates } from "./coreServer.mjs";
import { assignMiddlewares } from "./middlewares.mjs";

const app = express();

export function startCallbackServer() {
  assignMiddlewares(app);

  assignRoutes();

  app.listen(CALLBACK_SERVER_PORT, () => {
    // prettier-ignore
    console.log(`Callback server listening at http://localhost/${CALLBACK_SERVER_PORT}`);
  });
}

function assignRoutes() {
  app.post("/done", () => {
    sendUpdates("/some/file/path");
  });
}
