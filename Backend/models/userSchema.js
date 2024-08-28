import mongoose from "mongoose";

let userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    lastWatchedVideo: {
        type: Number,
        default: 1
    },
    lastWatchedVideoTimestamp: {
        type: Number,
        default: 0
    },
    videosWatched: [{ type: Number }]
})

export const User = mongoose.model("users", userSchema);