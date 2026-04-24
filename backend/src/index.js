import cors from "cors";
import "dotenv/config";
import express from "express";
import { apiRouter } from "./routes/api.js";

const app = express();
const port = Number(process.env.PORT) || 5000;
const devOrigins = process.env.CORS_ORIGINS?.split(",") || [
  "http://127.0.0.1:5173",
  "http://localhost:5173",
];

app.use(cors({ origin: devOrigins, credentials: true }));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`ok backend server run on http://localhost:${port}`);
});
