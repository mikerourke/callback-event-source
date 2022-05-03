import http from "node:http";

import express from "express";

import { CORE_SERVER_PORT, EXPORT_SERVER_PORT } from "./constants.mjs";
import { assignMiddlewares } from "./middlewares.mjs";

const app = express();

const clients = [];

/**
 * Server that represents the core API (primary communication point for the
 * frontend).
 */
export function startCoreServer() {
  assignMiddlewares(app);

  app.use("/events", addEventSourceClient);

  app.post("/export", sendExportRequest);

  app.listen(CORE_SERVER_PORT, () => {
    // prettier-ignore
    console.log(`Core server listening at http://localhost/${CORE_SERVER_PORT}`);
  });
}

export function sendEventSourceUpdates(fileName) {
  clients.forEach((response) => {
    const contents = JSON.stringify({
      fileName,
    });

    response.write(`data: ${contents}\n\n`);
  });
}

/**
 * Sends a request to the server that processes exports.
 */
function sendExportRequest(request, response) {
  const options = {
    hostname: "localhost",
    port: EXPORT_SERVER_PORT,
    path: "/export",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const exportRequest = http.request(options, () => {
    response.sendStatus(200);
  });

  exportRequest.on("error", (err) => {
    response.sendStatus(400);
  });

  exportRequest.end();
}

function addEventSourceClient(request, response) {
  console.log("Listening for event source");

  const client = response.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  clients.push(client);
}
