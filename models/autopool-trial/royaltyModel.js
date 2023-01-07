const mongoose = require("mongoose");

const royaltySchema = new mongoose.Schema(
  {
    user_id: String,
    status: Boolean,
  },
  { timestamps: true }
);

const RoyaltiIncome = new mongoose.model("RoyaltiIncome", royaltySchema);

module.exports = RoyaltiIncome;