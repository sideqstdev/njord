import "reflect-metadata";
import LoggingService from "./services/logging.service";
import { ApolloServer } from "apollo-server";
import { client, clientConnect, clientDisconnect } from "./lib/client";
import { createContext } from "./lib/context";
import { dev, fallbackPort, port } from "./lib/globals";
import { createSchema } from "./lib/schema";

const start = async () => {
  // connect client to database explicitly
  await clientConnect();

  const schema = await createSchema();

  // define apollo server params
  const server = new ApolloServer({
    schema: schema,
    context: createContext,
    playground: dev,
    cors: {
      credentials: true,
      origin: dev ? `http://localhost:8081` : `https://sideqst.com`,
    },
    logger: {
      debug: (msg) => LoggingService.debug(msg),
      info: (msg) => LoggingService.info(msg),
      warn: (msg) => LoggingService.warn(msg),
      error: (msg) => LoggingService.error(msg),
    },
    formatError: (err): Error => {
      if (dev) {
        LoggingService.error(JSON.stringify(err));
        return err;
      } else {
        return err;
      }
    },
    tracing: dev,
  });

  try {
    if (!port) {
      LoggingService.warn(
        `No port defined in env, defaulted to ${fallbackPort}`
      );
    }
    const { url } = await server.listen({
      port: port || fallbackPort,
      host: dev ? "0.0.0.0" : undefined,
    });
    LoggingService.info(`Server listening on ${url}`);
  } catch (err) {
    throw new Error(err);
  }
};

start().catch((err) => {
  LoggingService.error(`Server error: ${err}`);
});
