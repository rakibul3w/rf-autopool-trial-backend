const mongoose = require("mongoose");

const autopoolInfoSchema = new mongoose.Schema(
  {
    autopool_name: {type: String, require: true, enum: ["autopool-one", "autopool-two", "autopool-three", "autopool-four", "autopool-five", "autopool-six", "autopool-seven", "autopool-eight", "autopool-nine", "autopool-ten", "autopool-eleven", "autopool-twelve", "autopool-thirteen", "autopool-fourteen", "autopool-fifteen", "autopool-sixteen"]},
    // current_root: String,
    // previous_root: String,
    // back_tract: Boolean,
    // previous_root_index: Number,
    // current_root_index: Number,
    // current_index: Number,

    current_up_level: Number,
    current_up_level_index: Number, // 2nd less than current_up_level_limit or not
    current_down_level: Number,
    current_down_level_index: Number, // 1st less than 3 or not
    current_up_level_limit: Number, // 2nd geter than current_up_level_index or not
    this_index: Number, // total index count in down level
    tree_history: Array,

    // tree_history: [{
    //     user_id: "RF001",
    //     up_level: 1,
    //     down_level: 1,
    //     this_child_level: 1,
    //     parent: "root/user_id",
    //     this_child_index: 1,
    //   }
    // ]
  },
  { timestamps: true }
);

const AutopoolInfo = new mongoose.model("AutopoolInfo", autopoolInfoSchema);

module.exports = AutopoolInfo;