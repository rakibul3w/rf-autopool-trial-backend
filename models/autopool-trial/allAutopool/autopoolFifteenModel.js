const mongoose = require("mongoose");

const autopoolFifteenSchema = new mongoose.Schema(
  {
    user_id: {type: String, require: true},
    top1: String,
    top2: String,
    position: String,
    child: Array,
  },
  { timestamps: true }
);

const AutopoolFifteen = new mongoose.model("AutopoolFifteen", autopoolFifteenSchema);

module.exports = AutopoolFifteen;