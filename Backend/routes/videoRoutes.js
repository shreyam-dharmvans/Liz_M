import { Router } from "express";
import { getAllVideos, getSingleVideo, uploadVideo } from "../controllers/videoController.js";
import { verifyToken } from "../utils/token.js";
import { upload } from "../utils/cloudConfig.js"
import { Video } from "../models/videoSchema.js";



let videoRouter = Router();

videoRouter.get("/all-videos", verifyToken, getAllVideos);
videoRouter.get("/single-video", verifyToken, getSingleVideo);

videoRouter.post("/upload", async (req, res) => {

    try {
        let { topic, videoInfo, videoPath } = req.body;

        let allVideos = await Video.find();
        let length = 0;

        if (allVideos) {
            length = allVideos.length;
        }

        let newVideo = new Video({
            topic,
            videoPath,
            videoInfo,
            index: length + 1
        })

        await newVideo.save();

        res.status(200).json({
            success: true,
            message: "video uploaded successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message
        })
    }

});



export default videoRouter;