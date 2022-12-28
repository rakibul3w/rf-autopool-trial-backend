const mongoose = require("mongoose");

const autopoolFiveSchema = new mongoose.Schema(
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

const AutopoolFive = new mongoose.model("AutopoolFive", autopoolFiveSchema);

module.exports = AutopoolFive;