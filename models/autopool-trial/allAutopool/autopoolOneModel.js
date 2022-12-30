const mongoose = require("mongoose");

const autopoolOneSchema = new mongoose.Schema(
  {
    user_id: {type: String, require: true},
    top1: String,
    top2: String,
    position: String,
    child: Array,
  },
  { timestamps: true }
);

const AutopoolOne = new mongoose.model("AutopoolOne", autopoolOneSchema);

module.exports = AutopoolOne;