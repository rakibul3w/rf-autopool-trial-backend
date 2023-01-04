const mongoose = require("mongoose");

const autopoolSevenSchema = new mongoose.Schema(
  {
    user_id: {type: String, require: true},
    top1: String,
    top2: String,
    position: String,
    child: Array,
  },
  { timestamps: true }
);

const AutopoolSeven = new mongoose.model("AutopoolSeven", autopoolSevenSchema);

module.exports = AutopoolSeven;