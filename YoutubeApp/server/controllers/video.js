import User from "../models/User.js";
import Video from "../models/Video.js";
import { v4 as uuidFun } from "uuid";
import mime from "mime";
import IsLiked from "../models/IsLiked.js";
import Subscribe from "../models/Subscribe.js" 
import { subscribe } from "./user.js";
import { createError } from "../error.js";

export const allVideo = async (req, res, next) => {
  try{
    const videos = await Video.find({}).populate("user")
    return res.status(200).send(videos)
  }catch(error){
    next(error)
  }
};

export const uploadVideo = async (req, res, next) => {
  try {
    const fileVideo = req?.files.video;
    const onlyVideo = fileVideo.mimetype.includes("video");
    if (onlyVideo) {
      const uuid = uuidFun();
      const typeFile = mime.getExtension(fileVideo.mimetype);
      const fileName = `video_${uuid}.${typeFile}`;
      const saveMetaData = {
        pathSave: `/storage/videos`,
        pathDB: `/videos`,
      };
      const dirSave = `${saveMetaData.pathSave}/${fileName}`
      const dirDB = `${saveMetaData.pathDB}/${fileName}`
      fileVideo.mv(`.${dirSave}`, async function (err) {
        if (err) return res.status(500).send(err);
        const savedVideo = new Video({
          user: req.user.userInfo._id,
          videoUrl: dirDB,
        })
        await savedVideo.save();
        res.status(200).json(savedVideo);
      });
      return;
    }
    res.status(422).json(null);
  } catch (error) {
    console.log(error);
  }
};

export const completeVideo = async (req, res, next) => {
  try {
    const dataComplete = JSON.parse(req?.body?.dataComplete);
    const fileImage = req?.files.image;
    const imageThumb = fileImage.mimetype.includes("image");
    if (imageThumb) {
      const uuid = uuidFun();
      const typeFile = mime.getExtension(fileImage.mimetype);
      const fileName = `image_${uuid}.${typeFile}`;

      const saveMetaData = {
        pathSave: `/storage/images`,
        pathDB: `/images`,
      };

      const dirSave = `${saveMetaData.pathSave}/${fileName}`
      const dirDB = `${saveMetaData.pathDB}/${fileName}`
      fileImage.mv(`.${dirSave}`, async function (err) {
        if (err) return res.status(500).send(err);
        const params = {
          titleVideo: dataComplete.TitleVideo,
          desc: dataComplete.Desc || null,
          imgUrl: dirDB,
        };
        const updateVideo = await Video.findByIdAndUpdate(req.params.id, {...params,});
        updateVideo.save();
        res.status(200).json(updateVideo);
      });
      return;
    }
    res.status(422).json(null);
} catch (error) {
    next(error);
  }
};

export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id).populate("user")

    const countLike = await IsLiked.count({
      video: req.params.id,
      isLikes: true,
    })
    
    const countDisLike = await IsLiked.count({
      video: req.params.id,
      isLikes: false,
    })

    // Xem người dùng đã nhấn Subscribe hay chưa
    const countSubscribe = await Subscribe.count({
      video: req.params.id,
      subscribe: true,
    })

    const resultStatus = {
      like: countLike,
      dislike: countDisLike,
      subscribe: countSubscribe
    }

    video._doc.reactions = resultStatus
    res.status(200).json(video)
  } catch (err) {
    next(err)
  }
}

export const listSearch = async (req,res,next) => {
  try{
    const query = req.query.search_query
    const searchVideo = await Video.find({
      titleVideo:{ $regex: query , "$options": "i" }
    }).limit(40).populate("user")
    res.status(200).send(searchVideo)
  }catch(error){
    next(error)
  }

}


export const updateInfoVideo = async(req,res,next) => {
  try{
    const updateTitle = req.body?.titleVideo
    const updateDesc = req.body?.des
     if(updateTitle){
      await Video.findByIdAndUpdate(req.params.idVideo,{titleVideo: updateTitle})
      res.status(200).send("Cập nhật tiêu đề thành công")
    }
    if(updateDesc){
      await Video.findByIdAndUpdate(req.params.idVideo,{desc: updateDesc})
      res.status(200).send("Cập nhật miêu tả thành công")
    }
  }catch(error){
    next(error)
  }
} 


export const deleteVideo = async (req, res, next) => {
  try {
    const idUser = req.user.userInfo._id
    const idVideo = await Video.findById(req.params.idVideo);
    if (!idVideo) return next(createError(404, "Không tìm thấy video"));
    if (idUser.toString() === idVideo.user.toString()) {
      await Video.findByIdAndDelete(req.params.idVideo);
      return res.status(200).json("Xóa video thành công");
    } else {
      return next(createError(403, "Bạn chỉ có thể xóa video của bạn"));
    }
  } catch (err) {
    next(err);
  }
};

export const addView = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    res.status(200).json("Lượt xem đã được tăng lên");
  } catch (err) {
    next(err);
  }
};


// export const listSearch = async (req, res, next) => {
//   console.log(req.body)
//   // const query = req.query.q;
//   res.send("200")
//   // try {
//   //   const videos = await Video.find({
//   //     title: { $regex: query, $options: "i" },
//   //   }).limit(40);
//   //   res.status(200).json(videos);
//   // } catch (err) {
//   //   next(err);
//   // }
// };

// export const updateVideo = async (req, res, next) => {
    //   try {
        //     const video = await Video.findById(req.params.id);
        //     if (!video) return next(createError(404, "Video not found!"));
        //     if (req.user.id === video.userId) {
//       const updatedVideo = await Video.findByIdAndUpdate(
    //         req.params.id,
    //         {
        //           $set: req.body,
        //         },
        //         { new: true }
        //       );
        //       res.status(200).json(updatedVideo);
        //     } else {
//       return next(createError(403, "You can update only your video!"));
//     }
//   } catch (err) {
//     next(err);
//   }
// };





// export const random = async (req, res, next) => {
//   try {
//     const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
//     res.status(200).json(videos);
//   } catch (err) {
//     next(err);
//   }
// };

// export const trend = async (req, res, next) => {
//   try {
//     const videos = await Video.find().sort({ views: -1 });
//     res.status(200).json(videos);
//   } catch (err) {
//     next(err);
//   }
// };

// export const sub = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id);
//     const subscribedChannels = user.subscribedUsers;

//     const list = await Promise.all(
//       subscribedChannels.map(async (channelId) => {
//         return await Video.find({ userId: channelId });
//       })
//     );

//     res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
//   } catch (err) {
//     next(err);
//   }
// };

// export const getByTag = async (req, res, next) => {
//   const tags = req.query.tags.split(",");
//   try {
//     const videos = await Video.find({ tags: { $in: tags } }).limit(20);
//     res.status(200).json(videos);
//   } catch (err) {
//     next(err);
//   }
// };

