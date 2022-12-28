const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema(
  {
    video_id: {type: String, default: "TLCPOPUPVIDEO"},
    video_link: String,
    date: { type: String, default: new Date().toDateString() },
  },
  { timestamps: true }
);

const VideoData = new mongoose.model("VideoData", VideoSchema);

module.exports = VideoData;