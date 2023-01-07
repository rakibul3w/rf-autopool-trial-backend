const mongoose = require("mongoose");

const adminWallet = new mongoose.Schema(
  {
    user_id: {type: String, default: "ADMIN"},
    withdraw_commission_income: {type: Number},
    fund_transfer_commission_income: {type: Number},
    user_topup_commission_income: {type: Number},
    topup_account_commission_income: {type: Number},
    level_update_income: {type: Number, default: 0},
    total_amount: {type: Number, default: 0},
    date: { type: String, default: new Date().toDateString() },
  },
  { timestamps: true }
);

const AdminWallet = new mongoose.model("adminWallet", adminWallet);

module.exports = AdminWallet;