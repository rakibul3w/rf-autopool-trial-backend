const mongoose = require("mongoose");

const autopoolFourSchema = new mongoose.Schema(
  {
    user_id: {type: String, require: true},
    top1: String,
    top2: String,
    position: String,
    child: Array,
  },
  { timestamps: true }
);

const AutopoolFour = new mongoose.model("AutopoolFour", autopoolFourSchema);

module.exports = AutopoolFour;