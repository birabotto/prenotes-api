import express from "express";
import cors from "cors";
import morgan from "morgan";
import { errorHandler } from "./middlewares/errorHandler";
import prenoteRoutes from "./routes/prenoteRoutes";
import articlesRoutes from "./routes/articleRoutes";
import chartsRoutes from "./routes/chartsRoutes";
import deleteRoutes from "./routes/deleteRoutes";
const app = express();

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
  origin: ["*"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/v1/api/prenotes", prenoteRoutes);
app.use("/v1/api/articles", articlesRoutes);
app.use("/v1/api/charts", chartsRoutes);
app.use("/delete", deleteRoutes);
app.use("/", (req, res) => {
  res.status(200).json({ ok: "ok" });
});
app.use(errorHandler);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
