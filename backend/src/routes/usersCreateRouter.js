import express from "express";
import User from "../models/usersModel.js";

const router = express.Router();

//this api will call after any user successfully create their account...no frontend api call here
router.post("/clerk", async (req, res) => {
  try {
    const event = req.body;

    if (event.type === "user.created") {
      const { id, email_addresses, first_name, last_name, image_url } =
        event.data;

      const email = email_addresses?.[0]?.email_address;

      const existingUser = await User.findOne({ clerkId: id });

      if (!existingUser) {
        await User.create({
          clerkId: id,
          email,
          firstName: first_name,
          lastName: last_name,
          image: image_url,
        });
      }
    }

    return res.status(200).json({ message: " User created" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// GET user by clerkId
router.get("/:clerkId", async (req, res) => {
  try {
    const user = await User.find({ clerkId: req.params.clerkId });
    res.status(200).json({ result: users, message: "User get successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
