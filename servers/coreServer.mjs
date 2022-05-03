import http from "node:http";

import express from "express";

import { CORE_SERVER_PORT, EXPORT_SERVER_PORT } from "./constants.mjs";
import { assignMiddlewares } from "./middlewares.mjs";

const app = express();

const clients = [];

export function startCoreServer() {
  assignMiddlewares(app);

  assignRoutes();

  app.listen(CORE_SERVER_PORT, () => {
    // prettier-ignore
    console.log(`Core server listening at http://localhost/${CORE_SERVER_PORT}`);
  });
}

function assignRoutes() {
  app.use("/events", (request, response) => {
    console.log("Listening for event source");

    const client = addClient(response);

    return clients.push(client);
  });

  app.post("/export", (request, response) => {
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
  });
}

export function sendUpdates(fileName) {
  clients.forEach((response) => {
    const contents = JSON.stringify({
      fileName,
    });

    response.write(`data: ${contents}\n\n`);
  });
}

function addClient(response) {
  return response.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });
}
