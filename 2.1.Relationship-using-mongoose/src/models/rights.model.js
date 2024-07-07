const { default: mongoose } = require("mongoose");

const RightsSchema = new mongoose.Schema(
  {
    name: {
      type: "String",
      required: "true",
    },
    staffs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Staff",
      },
    ],
  },
  { timestamps: true }
);
const Right = mongoose.model("Right", RightsSchema);
module.exports = Right;
