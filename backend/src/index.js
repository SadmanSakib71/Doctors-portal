import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

const app = express();
const port = Number(process.env.PORT) || 5000;
const devOrigins = process.env.CORS_ORIGINS?.split(",") || [
  "http://127.0.0.1:5173",
  "http://localhost:5173",
];

//connect with database
mongoose
  .connect("mongodb://localhost/doctorsPortal")
  .then(() => {
    console.log("Connected with database successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors({ origin: devOrigins, credentials: true }));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`[backend] http://localhost:${port}`);
});
