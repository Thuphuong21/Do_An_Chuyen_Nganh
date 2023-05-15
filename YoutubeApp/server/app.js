import express from 'express'
import mongoose from 'mongoose';
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/user.js";
import videoRoutes from "./routes/videos.js";
import commentRoutes from "./routes/comments.js";
import cors from "cors"
import fileUpload from 'express-fileupload';
import mime from "mime"

const app = express();
dotenv.config()

const connect = async () => {
  try {
      await mongoose.connect('mongodb://127.0.0.1:27017/YoutubeApp');
      console.log("Connect Mongodb Successful!!!")
  } catch(error) {
      console.log("Connect failure!!!" + error)
  }
}

//middlewares
app.use(cookieParser())
app.use(express.json())

app.use(cors({
  origin: process.env.FRONT_END_ORIGIN,
  credentials: true,
}))

app.use(fileUpload())
app.use(express.static('storage'))
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);

app.use((err,req,res,next)=>{
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
      success:false,
      status,
      message,
  })

})

app.listen(5000, () => {
    connect()
    console.log("Successful connection Server")
})