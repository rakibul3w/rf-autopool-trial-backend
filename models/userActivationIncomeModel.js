const mongoose = require("mongoose");

const userActivationIncomeSchema = new mongoose.Schema(
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

const UserActivationIncome = new mongoose.model("UserActivationIncome", userActivationIncomeSchema);

module.exports = UserActivationIncome;