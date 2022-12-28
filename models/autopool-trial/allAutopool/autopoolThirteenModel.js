const mongoose = require("mongoose");

const autopoolThirteenSchema = new mongoose.Schema(
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

const AutopoolThirteen = new mongoose.model("AutopoolThirteen", autopoolThirteenSchema);

module.exports = AutopoolThirteen;