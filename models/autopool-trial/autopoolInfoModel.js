const mongoose = require("mongoose");

const autopoolInfoSchema = new mongoose.Schema(
  {
    autopool_name: {type: String, require: true},
    current_root: String,
    previous_root: String,
    back_tract: Boolean,
    previous_root_index: Number,
    current_root_index: Number,
    current_index: Number,
  },
  { timestamps: true }
);

const AutopoolInfo = new mongoose.model("AutopoolInfo", autopoolInfoSchema);

module.exports = AutopoolInfo;