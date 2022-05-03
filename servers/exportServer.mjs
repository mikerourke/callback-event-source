import http from "node:http";

import express from "express";

import { CALLBACK_SERVER_PORT, EXPORT_SERVER_PORT } from "./constants.mjs";
import { assignMiddlewares } from "./middlewares.mjs";

const app = express();

export function startExportServer() {
  assignMiddlewares(app);

  assignRoutes();

  app.listen(EXPORT_SERVER_PORT, () => {
    // prettier-ignore
    console.log(`Export server listening at http://localhost/${EXPORT_SERVER_PORT}`);
  });
}

function assignRoutes() {
  app.post("/export", (request, response) => {
    const options = {
      hostname: "localhost",
      port: CALLBACK_SERVER_PORT,
      path: "/done",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const callbackRequest = http.request(options, () => {
      response.sendStatus(200);
    });

    callbackRequest.on("error", (err) => {
      response.sendStatus(400);
    });

    callbackRequest.end();
  });
}
