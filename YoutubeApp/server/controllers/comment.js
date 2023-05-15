import { createError } from "../error.js";
import Comment from "../models/Comment.js";
import Video from "../models/Video.js";

export const addComment = async (req, res, next) => {
   const videoId = req.params.videoId
   const userId = req?.user?.userInfo?._id
  try {
    if(req.body.comment){
        const newComment = new Comment(
          { 
            user: userId,
            video: videoId,
            desc: req.body.comment
          }
        )
        const savedComment = await newComment.save()
        res.status(200).send(savedComment)
        return
    }
        return res.status(400).send("Lỗi tham số")
  } catch (err) {
    next(err)
  }
}

export const getComments = async (req, res, next) => {
  const videoId = req.params.videoId
  try {
    const comments = await Comment.find({ video: videoId }).populate("user")
    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
}

export const deleteComment = async (req, res, next) => {  
  try {
    const commentId = req.params.commentId
    const userId = req?.user?.userInfo?._id
    const comment = await Comment.findById(commentId)
    const videoId = comment?.video
    const video = await Video.findById(videoId)

    if (comment.user.toString() === userId.toString() && comment.video === videoId){
      await Comment.findByIdAndDelete(commentId)
      res.status(200).json("Bình luận đã bị xóa");
    } else {
      return next(createError(403, "Bạn có thể xóa bất kỳ bình luận của bạn!"));
    }
  } catch (err) {
    next(err);
  }
};

export const editComment = async (req,res,next) => {
    try{
      const commentId = req.params.commentId
      const comment = await Comment.findById(commentId)
      const userId = req?.user?.userInfo?._id
      const videoId = comment?.video
      const video = await Video.findById(videoId)
      const params = {
          desc: req?.body?.comment
      }
      if (comment.user.toString() === userId.toString() && comment.video === videoId){
        await Comment.findByIdAndUpdate(commentId,{ ...params})
        res.status(200).send("Cập nhật comment thành công")
        return
      } 
        return res.status(400).send("Tham số lỗi hoặc đây không phải tài khoản của bạn")
    } catch(error){
      next(error)
    }
}