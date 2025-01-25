import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";
import prenoteRoutes from "./routes/prenoteRoutes";
import articlesRoutes from "./routes/articleRoutes";
import chartsRoutes from "./routes/chartsRoutes";
import deleteRoutes from "./routes/deleteRoutes";
const app = express();

const isDev = process.env.NODE_ENV === "development";

app.use(
  cors({
    origin: "*", // Permitir todas as origens
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Cabeçalhos permitidos
    credentials: true, // Permitir envio de cookies
  })
);
app.use(express.json());
app.use("/v1/api/prenotes", prenoteRoutes);
app.use("/v1/api/articles", articlesRoutes);
app.use("/v1/api/charts", chartsRoutes);
app.use("/delete", deleteRoutes);
app.use(errorHandler);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
