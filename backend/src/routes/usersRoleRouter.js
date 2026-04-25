import express from "express";
import User from "../models/usersModel.js";

const router = express.Router();

//post user role
router.post("", async (req, res) => {
  try {
    const { clerkId, email, firstName, lastName, image } = req.body;

    let user = await User.findOne({ clerkId });

    if (!user) {
      user = await User.create({
        clerkId,
        email,
        firstName,
        lastName,
        image,
      });
    } else {
      res.status(400).json({ error: "User is already available" });
    }

    res.status(200).json("user added successfully");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
