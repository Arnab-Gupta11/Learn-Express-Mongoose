import mongoose from "mongoose";

const userShcema = new mongoose.Schema(
  {
    username: {
      type: "String",
      required: true,
      uniqe: true,
      lowercase: true,
    },
    email: {
      type: "String",
      required: true,
      uniqe: true,
      lowercase: true,
    },
    password: {
      type: "String",
      required: ture,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userShcema);
