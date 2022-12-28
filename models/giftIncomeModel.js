const mongoose = require("mongoose");

const giftIncomeSchema = new mongoose.Schema(
    {
        name: String,
        user_id: String,
        transaction_id: { type: String, unique: true },
        amount: { type: Number },
        type: { type: String },
        income_from: { type: Array },
      },
      { timestamps: true }
);

const GiftIncome = new mongoose.model("GiftIncome", giftIncomeSchema);

module.exports = GiftIncome;