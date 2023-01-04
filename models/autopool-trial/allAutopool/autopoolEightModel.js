const mongoose = require("mongoose");

const autopoolEightSchema = new mongoose.Schema(
  {
    user_id: {type: String, require: true},
    top1: String,
    top2: String,
    position: String,
    child: Array,
  },
  { timestamps: true }
);

const AutopoolEight = new mongoose.model("AutopoolEight", autopoolEightSchema);

module.exports = AutopoolEight;