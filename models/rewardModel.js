const mongoose = require("mongoose");

const rewardIncomeSchema = new mongoose.Schema(
    {
        name: String,
        user_id: String,
        transaction_id: { type: String, unique: true },
        amount: { type: Number },
        type: { type: String },
        remark: { type: String },
        income_from: { type: String },
      },
      { timestamps: true }
);

const RewardIncome = new mongoose.model("RewardIncome", rewardIncomeSchema);

module.exports = RewardIncome;