import { Router } from "express";
import { login, logout, signup, updateLastWatchedVideo, updateTimeStamp } from "../controllers/userControllers.js";
import { verifyToken } from "../utils/token.js";

const userRouter = Router();

userRouter.post("/login", login);
userRouter.post("/signup", signup);
userRouter.get("/logout", verifyToken, logout);

userRouter.put("/timestamp", updateTimeStamp);
userRouter.put("/last-watched-video", updateLastWatchedVideo);

export default userRouter;