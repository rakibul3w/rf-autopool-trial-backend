const mongoose = require("mongoose");

const autopoolElevenSchema = new mongoose.Schema(
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

const AutopoolEleven = new mongoose.model("AutopoolEleven", autopoolElevenSchema);

module.exports = AutopoolEleven;