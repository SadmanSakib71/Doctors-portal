import express from "express";
import User from "../models/usersModel.js";

const router = express.Router();

// GET user by clerkId
router.get("/:clerkId", async (req, res) => {
  try {
    const user = await User.find({ clerkId: req.params.clerkId });
    res.status(200).json({ result: user, message: "User get successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
