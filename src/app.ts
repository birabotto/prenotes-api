import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import { errorHandler } from "./middlewares/errorHandler";
import prenoteRoutes from "./routes/prenoteRoutes";
import articlesRoutes from "./routes/articleRoutes";
import chartsRoutes from "./routes/chartsRoutes";
import deleteRoutes from "./routes/deleteRoutes";
import authRoutes from "./routes/authRoutes";
const app = express();
const server = http.createServer(app);

import { isAuthenticated } from "./middlewares/authenticateToken";
const io = new Server(server, { cors: { origin: "*" } });

app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
    ].join(" ");
  })
);

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/v1/api/auth", authRoutes);
app.use("/v1/api/prenotes", prenoteRoutes);
app.use("/v1/api/articles", articlesRoutes);
app.use("/v1/api/charts", chartsRoutes);
app.use("/delete", deleteRoutes);
app.use("/", (req, res) => {
  res.status(200).json({ ok: "ok" });
});
app.use(errorHandler);

io.on("connection", (socket) => {
  console.log("Cliente conectado: >>>>>>>>>>>>>>>>>>>>", socket.id);

  socket.on("updateInProgress", async (cardId) => {
    console.log(`Card ${cardId} atualizado para "em progresso"`);
    await prisma.article.update({
      where: { id: Number(cardId) },
      data: { status: "in_progress" },
    });

    io.emit("progressUpdated");
  });

  socket.on("updateAvailable", async (cardId) => {
    console.log(`Card ${cardId} atualizado para "em available"`);
    await prisma.article.update({
      where: { id: Number(cardId) },
      data: { status: "available" },
    });

    io.emit("progressUpdated");
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });
});

const port = 5000;
const host = "0.0.0.0";

// Usando server.listen() em vez de app.listen()
server.listen(port, host, () => {
  console.log(`Servidor rodando em http://${host}:${port}`);
});
