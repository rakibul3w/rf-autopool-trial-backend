const mongoose = require("mongoose");

const autopoolNineSchema = new mongoose.Schema(
  {
    user_id: {type: String, require: true},
    top1: String,
    top2: String,
    position: String,
    child: Array,
  },
  { timestamps: true }
);

const AutopoolNine = new mongoose.model("AutopoolNine", autopoolNineSchema);

module.exports = AutopoolNine;