const mongoose = require("mongoose");

const autopoolThreeSchema = new mongoose.Schema(
  {
    user_id: {type: String, require: true},
    top1: String,
    top2: String,
    position: String,
    child: Array,
  },
  { timestamps: true }
);

const AutopoolThree = new mongoose.model("AutopoolThree", autopoolThreeSchema);

module.exports = AutopoolThree;