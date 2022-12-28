const mongoose = require("mongoose");

const autopoolThreeSchema = new mongoose.Schema(
  {
    user_id: {type: String, require: true},
    top1: String,
    top2: String,
    position: String,
    amount_after_charge: Number,
    child: Array,
  },
  { timestamps: true }
);

const AutopoolThree = new mongoose.model("AutopoolThree", autopoolThreeSchema);

module.exports = AutopoolThree;