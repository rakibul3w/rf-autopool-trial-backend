const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    user_id: { type: String, require: true },
    sponsor_id: { type: String, require: true },
    direct_income: { type: Number, default: 0 },
    indirect_income: { type: Number, default: 0 },
    direct_fund_transfer_income: { type: Number, default: 0 },
    direct_withdraw_income: { type: Number, default: 0 },
    autopool_income: { type: Number, default: 0 },
    level_update_income: { type: Number, default: 0 },
    autopool_freez_income: { type: Number, default: 0 },
    reward_income: { type: Number },
    gift_income: { type: Number },
    user_activation_income: { type: Number },
    current_amount: { type: Number },
    topupable_balance: { type: Number, default: 0 },
    withdrawable_balance: { type: Number, default: 0 },
    total_deposite: { type: Number, default: 0 },
    total_income: { type: Number, default: 0  },
    total_withdraw: { type: Number, default: 0 },
    booster_income:{ type: Number, default: 0 },
    royalty_income:{ type: Number, default: 0 },
    wallet_address: String,
    date: { type: String, default: new Date().toDateString() },
  },
  { timestamps: true }
);

const Wallet = new mongoose.model("Wallet", walletSchema);

module.exports = Wallet;
