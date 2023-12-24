import mongoose from "mongoose";

const categoryShcema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Category = new mongoose.model("Category", categoryShcema);
