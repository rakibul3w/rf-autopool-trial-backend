const mongoose = require("mongoose");

const directWithdrawIncomeSchema = new mongoose.Schema(
    {
        name: String,
        user_id: String,
        transaction_id: { type: String, unique: true },
        amount: { type: Number },
        type: { type: String },
        income_from: { type: String },
      },
      { timestamps: true }
);

const DirectWithdrawIncome = new mongoose.model("DirectWithdrawIncome", directWithdrawIncomeSchema);

module.exports = DirectWithdrawIncome;