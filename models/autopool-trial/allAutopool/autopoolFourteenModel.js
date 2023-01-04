const mongoose = require("mongoose");

const autopoolFourteenSchema = new mongoose.Schema(
  {
    user_id: {type: String, require: true},
    top1: String,
    top2: String,
    position: String,
    child: Array,
  },
  { timestamps: true }
);

const AutopoolFourteen = new mongoose.model("AutopoolFourteen", autopoolFourteenSchema);

module.exports = AutopoolFourteen;