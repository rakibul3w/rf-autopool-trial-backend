const mongoose = require("mongoose");

const autopoolFiveSchema = new mongoose.Schema(
  {
    user_id: {type: String, require: true},
    top1: String,
    top2: String,
    position: String,
    child: Array,
  },
  { timestamps: true }
);

const AutopoolFive = new mongoose.model("AutopoolFive", autopoolFiveSchema);

module.exports = AutopoolFive;