import jwt from "jsonwebtoken";
import { createError } from "./error.js";
import User from "./models/User.js";
import Video from "./models/Video.js"

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(createError(401, "Xin vui lòng đăng nhập"));

  jwt.verify(token, process.env.JWT, async (err, user) => {
    // console.log("OK");
    if (err) return next(createError(403, "Token is not valid!"))

    const OnlyUser = await User.findOne({ _id: user.id })
    if(OnlyUser){
      const {password,...userInfo} = OnlyUser._doc
      const videoUser = await Video.findOne({ userId: user.id })
      const getAllVideo = await Video.find({})
      
      const objInfo = {
        userInfo: userInfo,
        videoUser: videoUser,
        getAllVideo: getAllVideo
      }
      req.user = objInfo
      next()
    }
  });
};
