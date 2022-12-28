const mongoose = require("mongoose");

const giftedSchema = new mongoose.Schema(
  {
    user_id: { type: String, require: true },
    user_name: { type: String },
    history: { type: [Object], default: [] },
    gifted_date: String,
    join_date: String,
  },
  { timestamps: true }
);

const GiftedUser = new mongoose.model("GiftedUser", giftedSchema);

module.exports = GiftedUser;