const mongoose = require("mongoose");

const autopoolTenSchema = new mongoose.Schema(
  {
    user_id: {type: String, require: true},
    top1: String,
    top2: String,
    position: String,
    child: Array,
  },
  { timestamps: true }
);

const AutopoolTen = new mongoose.model("AutopoolTen", autopoolTenSchema);

module.exports = AutopoolTen;