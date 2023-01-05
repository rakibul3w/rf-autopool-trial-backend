const mongoose = require("mongoose");

const autopoolQueueSchema = new mongoose.Schema(
  {
    autopool_name: String,
    stack: Array,
  },
  { timestamps: true }
);

const AutopoolQueue = new mongoose.model("AutopoolQueue", autopoolQueueSchema);

module.exports = AutopoolQueue;