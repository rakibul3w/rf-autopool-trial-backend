const mongoose = require("mongoose");

const autopoolSevenSchema = new mongoose.Schema(
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

const AutopoolSeven = new mongoose.model("AutopoolSeven", autopoolSevenSchema);

module.exports = AutopoolSeven;