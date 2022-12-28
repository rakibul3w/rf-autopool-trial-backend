const mongoose = require("mongoose");

const autopoolTwoSchema = new mongoose.Schema(
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

const AutopoolTwo = new mongoose.model("AutopoolTwo", autopoolTwoSchema);

module.exports = AutopoolTwo;