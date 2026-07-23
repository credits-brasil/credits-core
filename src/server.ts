import "dotenv/config";

import Fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import cron from "node-cron";
import axios from "axios";

import { spcRoutes } from "./routes/spc.routes";

const server: FastifyInstance = Fastify({
  logger: true,
  bodyLimit: 1048576000,
});

server.register(cors, {});

server.register(spcRoutes);

const PORT = process.env.PORT;

server.get("/", () => {
  return { hello: "world" };
});

server.get("/start-server", (_, reply) => {
  return reply.code(200).send({ message: "OK!" });
});

cron.schedule("*/1 * * * *", async () => {
  try {
    await axios.get(`https://credits-core.onrender.com/start-server`);

    console.log("⏳ Executando a cada 1 minutos:", new Date().toLocaleString());
  } catch {
    console.log("❌ Executando a cada 1 minutos:", new Date().toLocaleString());
  }
});

const start = async () => {
  try {
    server.listen({ host: "0.0.0.0", port: Number(PORT) }, (err) => {
      if (err) {
        server.log.error(err);
        process.exit(1);
      }

      // eslint-disable-next-line no-console
      console.log(`🚀 Server listening at ${PORT}`);
    });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();