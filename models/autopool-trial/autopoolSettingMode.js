const mongoose = require("mongoose");

const autopoolSettingSchema = new mongoose.Schema(
  {
    // system_id: {type: String, require: true, default: "system_autopool_setting"},
    autopool_name: String,
    status: Boolean,
  },
  { timestamps: true }
);

const AutopoolSetting = new mongoose.model("AutopoolSetting", autopoolSettingSchema);

module.exports = AutopoolSetting;