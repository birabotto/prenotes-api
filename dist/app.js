"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const morgan_1 = __importDefault(require("morgan"));
const errorHandler_1 = require("./middlewares/errorHandler");
const prenoteRoutes_1 = __importDefault(require("./routes/prenoteRoutes"));
const articleRoutes_1 = __importDefault(require("./routes/articleRoutes"));
const chartsRoutes_1 = __importDefault(require("./routes/chartsRoutes"));
const deleteRoutes_1 = __importDefault(require("./routes/deleteRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const authenticateToken_1 = require("./middlewares/authenticateToken");
const io = new socket_io_1.Server(server, { cors: { origin: "*" } });
app.use((0, morgan_1.default)(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, "content-length"),
        "-",
        tokens["response-time"](req, res),
        "ms",
    ].join(" ");
}));
const corsOptions = {
    origin: "*",
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use("/v1/api/auth", authRoutes_1.default);
app.use("/v1/api/prenotes", authenticateToken_1.isAuthenticated, prenoteRoutes_1.default);
app.use("/v1/api/articles", authenticateToken_1.isAuthenticated, articleRoutes_1.default);
app.use("/v1/api/charts", authenticateToken_1.isAuthenticated, chartsRoutes_1.default);
app.use("/delete", authenticateToken_1.isAuthenticated, deleteRoutes_1.default);
app.use("/", (req, res) => {
    res.status(200).json({ ok: "ok" });
});
app.use(errorHandler_1.errorHandler);
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
