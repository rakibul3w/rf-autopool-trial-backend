const mongoose = require("mongoose");

const directFundtransferIncomeSchema = new mongoose.Schema(
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

const DirectFundtransferIncome = new mongoose.model("DirectFundtransferIncome", directFundtransferIncomeSchema);

module.exports = DirectFundtransferIncome;