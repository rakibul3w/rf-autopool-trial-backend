const mongoose = require("mongoose");

const autopoolSixteenSchema = new mongoose.Schema(
  {
    user_id: {type: String, require: true},
    top1: String,
    top2: String,
    position: String,
    child: Array,
  },
  { timestamps: true }
);

const AutopoolSixteen = new mongoose.model("AutopoolSixteen", autopoolSixteenSchema);

module.exports = AutopoolSixteen;