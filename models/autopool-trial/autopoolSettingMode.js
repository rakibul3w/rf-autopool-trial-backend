const mongoose = require("mongoose");

const autopoolSettingSchema = new mongoose.Schema(
  {
    system_id: {type: String, require: true},
    // request_amount: Number,
    // withdraw_charge: Number,
    // amount_after_charge: Number,
    // trx_address: String,
    // status: String,
    // current_amount: Number,
  },
  { timestamps: true }
);

const AutopoolSetting = new mongoose.model("AutopoolSetting", autopoolSettingSchema);

module.exports = AutopoolSetting;