const mongoose = require("mongoose");

const autopoolThirteenSchema = new mongoose.Schema(
  {
    user_id: {type: String, require: true},
    top1: String,
    top2: String,
    position: String,
    child: Array,
  },
  { timestamps: true }
);

const AutopoolThirteen = new mongoose.model("AutopoolThirteen", autopoolThirteenSchema);

module.exports = AutopoolThirteen;