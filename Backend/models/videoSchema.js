import mongoose from "mongoose";

let videoSchema = mongoose.Schema({
    topic: {
        type: String,
        required: true
    },
    videoPath: {
        type: String,
        required: true
    },
    videoInfo: {
        type: String
    },
    index: {
        type: Number,
        required: true
    }
})

export const Video = mongoose.model("videos", videoSchema);