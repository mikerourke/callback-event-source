import http from "node:http";

import express from "express";

import { CALLBACK_SERVER_PORT, CORE_SERVER_PORT } from "./constants.mjs";
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
  app.post("/done", (request, response) => {
    const options = {
      hostname: "localhost",
      port: CORE_SERVER_PORT,
      path: "/events/update",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const coreRequest = http.request(options, () => {
      response.sendStatus(200);
    });

    coreRequest.on("error", (err) => {
      response.sendStatus(400);
    });

    coreRequest.end();
  });
}
