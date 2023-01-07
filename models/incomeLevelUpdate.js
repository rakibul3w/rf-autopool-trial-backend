const mongoose = require("mongoose");

const incomeLevelUpdateSchema = new mongoose.Schema(
    {
        user_id: String,
        transaction_id: { type: String, unique: true },
        amount: { type: Number },
        autopool: { type: String },
        income_from: { type: String },
      },
      { timestamps: true }
);

const IncomeLevelUpdate = new mongoose.model("IncomeLevelUpdate", incomeLevelUpdateSchema);

module.exports = IncomeLevelUpdate;