const mongoose = require("mongoose");

const autopoolTwelveSchema = new mongoose.Schema(
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

const AutopoolTwelve = new mongoose.model("AutopoolTwelve", autopoolTwelveSchema);

module.exports = AutopoolTwelve;