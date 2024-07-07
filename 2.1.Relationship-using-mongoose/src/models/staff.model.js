const { default: mongoose } = require("mongoose");

const staffSchema = new mongoose.Schema(
  {
    name: {
      type: "String",
      required: "true",
    },
    email: {
      type: "String",
      required: "true",
    },
    age: {
      type: "Number",
    },
  },
  { timestamps: true }
);
const Staff = mongoose.model("Staff", staffSchema);
module.exports = Staff;
