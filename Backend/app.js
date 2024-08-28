import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import videoRouter from "./routes/videoRoutes.js";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

if (process.env.NODE_ENV != "production") {
    dotenv.config();
}



main()
    .then(() => {
        console.log("database connected successfully");
    })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.MONGO_URL);
}

let app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

let port = process.env.PORT || 8080;
app.use(express.json());

app.use("/user", userRouter);
app.use("/video", videoRouter);

app.listen(port, () => {
    console.log(`server is listening at port ${port}`)
})