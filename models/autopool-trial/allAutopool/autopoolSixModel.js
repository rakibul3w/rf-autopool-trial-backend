const mongoose = require("mongoose");

const autopoolSixSchema = new mongoose.Schema(
  {
    user_id: {type: String, require: true},
    top1: String,
    top2: String,
    position: String,
    child: Array,
  },
  { timestamps: true }
);

const AutopoolSix = new mongoose.model("AutopoolSix", autopoolSixSchema);

module.exports = AutopoolSix;