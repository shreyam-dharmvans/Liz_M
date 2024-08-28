import { User } from "../models/userSchema.js";
import { Video } from "../models/videoSchema.js";
import { compare, hash } from "bcrypt";
import { createToken } from "../utils/token.js";

export const login = async (req, res) => {

    try {
        let { email, password } = req.body;

        let user = await User.findOne({ email });

        if (user) {
            let result = await compare(password, user.password);

            if (result) {

                // res.clearCookie("auth_token", { //removing previous token of user if stored
                //     httpOnly: true,
                //     signed: true,
                //     sameSite: 'none',
                //     secure: true
                // });

                let expiresIn = "7d";


                let token = createToken(user._id, email, expiresIn);
                res.cookie("auth_token", token, {
                    expiresIn,
                    httpOnly: true,
                    sameSite: 'none',
                    secure: true,
                    signed: true
                })

                return res.status(200).json({
                    success: true,
                    messsage: "user is successfully logged in",
                    user
                })
            } else {
                return res.status(400).json({
                    success: false,
                    message: "incorrect password"
                });
            }
        } else {
            return res.status(400).json({
                success: false,
                message: "No user exist with this email"
            })
        }
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            success: false,
            message: err.message
        })
    }

}

export const signup = async (req, res) => {
    try {
        let { username, email, password } = req.body;

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exist with this email"
            });
        }

        let hashedPassword = await hash(password, 10);

        let newUser = new User({
            username,
            email,
            password: hashedPassword,
            videosWatched: []
        })

        let result = await newUser.save();

        // res.clearCookie("auth_token", { //removing previous token of user if stored
        //     httpOnly: true,
        //     signed: true,
        //     sameSite: 'none',
        //     secure: true
        // });

        let expiresIn = "7d";


        let token = createToken(res._id, email, expiresIn);
        res.cookie("auth_token", token, {
            expiresIn,
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            signed: true
        })

        return res.status(200).json({
            success: true,
            message: "user successfully registered",
            user: newUser
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }


}

export const logout = (req, res) => {
    try {
        // res.clearCookie("auth_token", {
        //     httpOnly: true,
        //     signed: true,
        //     sameSite: 'none',
        //     secure: true
        // });

        return res.status(200).json({
            success: true
            , message: "Logged out successfully"
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }


}

export const updateTimeStamp = async (req, res) => {
    try {
        let { id } = res.locals.jwtData;
        let { timestamp } = req.body;

        let user = await User.findById(id);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Unable to find user"
            })
        }

        let updatedUser = await User.findByIdAndUpdate(id, { lastWatchedVideoTimestamp: timestamp }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Timestamp successfully updated"
        })


    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }


}

export const updateLastWatchedVideo = async () => {

    try {
        let { id } = res.locals.jwtData;


        let user = await User.findById(id);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Unable to find user"
            })
        }

        let changedUser = user;

        changedUser.videosWatched.push(user.lastWatchedVideo);

        changedUser.lastWatchedVideo = changedUser.lastWatchedVideo + 1;
        changedUser.lastWatchedVideoTimestamp = 0;

        let updatedUser = await User.findByIdAndUpdate(id, changedUser, { new: true });

        return res.status(200).json({
            success: true,
            message: "Last watched video updated successfully"
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }

}