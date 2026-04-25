import express from "express";

const router = express.Router();

router.post("", (req, res) => {
  console.log("users post");
});

export default router;
