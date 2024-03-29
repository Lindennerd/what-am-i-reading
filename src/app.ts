import dotenv from "dotenv";
import express from "express";
import * as http from "http";

import cors from "cors";
import debug from "debug";
import * as expressWinston from "express-winston";
import * as winston from "winston";

import { CommonRoutesConfig } from "./common/common.routes.config";
import { UsersRoutes } from "./users/users.routes.config";

dotenv.config();

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = 3000;
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug("app");

app.use(express.json());
app.use(cors());

const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true })
  ),
};

if (!process.env.DEBUG) {
  loggerOptions.meta = false;
}

app.use(expressWinston.logger(loggerOptions));
routes.push(new UsersRoutes(app));

app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).send(`Server up and running!`);
});

server.listen(port, () => {
  debugLog(`Server running at http://localhost:${port}`);

  routes.forEach((route: CommonRoutesConfig) => {
    debugLog(`Routes configured for ${route.getName()}`);
  });
});
