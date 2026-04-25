import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: {
      type: String,
      default: "",
    },

    firstName: {
      type: String,
      default: "",
    },

    lastName: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: ["admin", "doctor", "patient"],
      default: "patient",
    },

    doctorStatus: {
      type: String,
      enum: ["none", "pending", "approved", "rejected"],
      default: "none",
    },

    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("User", userSchema);
