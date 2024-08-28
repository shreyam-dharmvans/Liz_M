import { Video } from "../models/videoSchema.js"


export const getAllVideos = async (req, res) => {
    try {
        let allVideos = await Video.find();
        // let filteredVideos = allVideos.map((video) => {
        //     return {
        //         topic: video.topic,
        //         index: video.index,
        //         _id: video._id
        //     }
        // })
        return res.status(200).json({
            success: "true",
            message: "All videos fetched successfully",
            allVideos
        })
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            success: "false",
            message: error.message
        })
    }

}

export const getSingleVideo = async (req, res) => {
    try {
        let { id } = req.body;
        let video = await Video.findById(id);


        if (video) {
            return res.status(200).json({
                success: true,
                message: "single video fetched",
                video
            })
        } else {
            return res.status(400).json({
                success: false,
                message: "Unable to fetch single video"
            })
        }


    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }

}

export const uploadVideo = async (req, res) => {

    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        let { topic, videoInfo } = req.body;

        let allVideos = await Video.find();
        let length = 0;

        if (allVideos) {
            length = allVideos.length;
        }

        let newVideo = new Video({
            topic,
            videoPath: req.file.path,
            videoInfo,
            index: length + 1
        })

        await newVideo.save();

        res.status(200).json({
            success: true,
            message: "video uploaded successfully",
            url: req.file.path
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message
        })
    }

}