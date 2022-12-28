const mongoose = require("mongoose");

const withdrawSchema = new mongoose.Schema(
  {
    user_id: {type: String, require: true},
    sponsor_id: {type: String},
    request_amount: Number,
    withdraw_charge: Number,
    amount_after_charge: Number,
    trx_address: String,
    status: String,
    current_amount: Number,
    transaction_id: String,
    date: {type: String, default: new Date().toDateString()},
    time: String,
  },
  { timestamps: true }
);

const Withdraw = new mongoose.model("Withdraw", withdrawSchema);

module.exports = Withdraw;
