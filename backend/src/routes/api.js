import { Router } from "express";

export const apiRouter = Router();

apiRouter.get("/health", (_req, res) => {
  res.json({ service: "doctors-portal-api", status: "ok" });
});
