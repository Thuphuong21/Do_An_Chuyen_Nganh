import { createError } from "../error.js";
import User from "../models/User.js";
import Video from "../models/Video.js";
import bcrypt from "bcryptjs";
import { v4 as uuidFun } from "uuid";
import mime from "mime";
import IsLiked from "../models/IsLiked.js";
import History from "../models/History.js"
import Subscribe from "../models/Subscribe.js";

export const updateInfoUser = async (req, res, next) => {
  try {
    const convertPassObj = JSON.parse(req?.body?.updateUser);
    const currentUser = await User.findOne({
      _id: req.user?.userInfo?._id.toString(),
    });
    const passCorrect = await bcrypt.compare(
      convertPassObj?.password,
      currentUser?.password
    );
    const avatarImg = req?.files?.avatar;
    const onlyImg = avatarImg?.mimetype.includes("image");
    if (!passCorrect) {
      return res.status(400).send("Mật khẩu cũ không đúng");
    }

    if (!onlyImg) {
      return res.status(400).send("Xin vui lòng nhập ảnh!");
    }

    if (onlyImg && passCorrect) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(convertPassObj.passNew, salt);
      const uuid = uuidFun();
      const typeFile = mime.getExtension(avatarImg.mimetype);
      const fileName = `avatar_${uuid}.${typeFile}`;
      const saveMetaData = {
        pathSave: `/storage/avatars`,
        pathDB: `/avatars`,
      };
      const dirSave = `${saveMetaData.pathSave}/${fileName}`;
      const dirDB = `${saveMetaData.pathDB}/${fileName}`;
      avatarImg.mv(`.${dirSave}`, async function (err) {
        if (err) return res.status(500).send(err);
        const params = {
          imgAvatarUrl: dirDB,
          fullname: convertPassObj.fullname,
          password: hash,
        };
        const updateUser = await User.findByIdAndUpdate(req.params.id, {
          ...params,
        });
        updateUser.save();
        res.status(200).json(updateUser);
      });
      return;
    }
    return;
    res.status(422).json(null);
  } catch (err) {
    next(err);
  }
};

export const returnAllVideoOneUser = async (req, res, next) => {
  try {
    const videoOnlyUser = await Video.find({ user: req.params.id }).populate("user");
    const handlers = [];

    videoOnlyUser.forEach((video) => {
      handlers.push(
        IsLiked.count({
          video: video?._id,
          isLikes: true,
        }).then((countLike) => {
          video._doc.countLike = countLike;
          return video;
        })
      );
    });

    const videos = await Promise.all(handlers);

    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};

export const updateCoverImageUrl = async (req, res, next) => {
  try {
    const fileCoverImageUrl = req?.files.coverImage;
    const onlyImg = fileCoverImageUrl.mimetype.includes("image");
    if (onlyImg) {
      const uuid = uuidFun();
      const typeFile = mime.getExtension(fileCoverImageUrl.mimetype);
      const fileName = `coverImg_${uuid}.${typeFile}`;
      const saveMetaData = {
        pathSave: `/storage/coverImgs`,
        pathDB: `/coverImgs`,
      };
      const dirSave = `${saveMetaData.pathSave}/${fileName}`;
      const dirDB = `${saveMetaData.pathDB}/${fileName}`;
      fileCoverImageUrl.mv(`.${dirSave}`, async function (err) {
        if (err) return res.status(500).send(err);
        const updateUser = await User.findByIdAndUpdate(req.params.id, {
          imgCoverImageUrl: dirDB,
        });
        updateUser.save();
        res.status(200).json(updateUser);
      });
      return;
    }
    return res.status(400).send("Xin vui lòng nhập đúng tệp định dạng");
  } catch (error) {
    next(error);
  }
};

export const like = async (req, res, next) => {
  try {
    const userId = req?.user?.userInfo?._id;
    const videoId = req.params.videoId;
    // isReacted là nếu như có biến isReacted tức là người dùng đã like
    const isReacted = await IsLiked.findOne({
      user: userId,
      video: videoId,
    });

    // Có 2 trường hợp: Người dùng click tiếp nút like thì xóa bảng dữ liệu đó đi
    // Trường hợp còn lại: Người dùng nhấn dislike thì gán isLikes bằng false tức người dùng đang dislike
    if (isReacted) {
      // Trường hợp. Người dùng đang ở dislike mà nhấn qua like
      if (!isReacted.isLikes) {
        const _ = await isReacted.updateOne({
          isLikes: true,
        });
        return res.status(200).send("Chuyển đổi dislike sang like thành công");
      }
      // Trường hợp người dùng đang ở nut like và nhấn tiếp
      await isReacted.delete();
      return res.status(200).send("Xóa like thành công");
    }

    // Trường hợp người dùng ở trạng thái nhàn rỗi và nhấn nút like
    const reaction = new IsLiked({
      user: userId,
      video: videoId,
      isLikes: true,
    });
    reaction.save();
    return res.send("update");
  } catch (error) {
    next(error);
  }
};

export const dislike = async (req, res, next) => {
  try {
    const userId = req?.user?.userInfo?._id;
    const videoId = req.params.videoId;
    const isReacted = await IsLiked.findOne({
      user: userId,
      video: videoId,
    });
    if (isReacted) {
      if (isReacted.isLikes) {
        const _ = await isReacted.updateOne({
          isLikes: false,
        });
        return res.send("Chuyển đổi like sang dislike thành công");
      }
      await isReacted.delete();
      return res.send("Xóa dislike thành công");
    }
    const reaction = new IsLiked({
      user: userId,
      video: videoId,
      isLikes: false,
    });

    reaction.save();
    return res.send("Truy cập nút dislike thành công");
  } catch (error) {
    next(error);
  }
};

export const StatusVideos = async (req, res, next) => {
  try {
    const userId = req?.user?.userInfo?._id;
    const videoId = req.params.videoId;
    const channelUserId = await Video.findById(videoId);

    // unique tức là video: videoId và  isLikes: true đều đúng mới tính là 1
    // Nghĩa là tìm tất cả video có id params vừa truyền về và điều kiện tiếp theo là những video nào đã có nút like

    const countLike = await IsLiked.count({
      video: videoId,
      isLikes: true,
    });

    const countSubscribe = await Subscribe.count({
      subscribeChannel: channelUserId?.user,
      subscribe: true,
    });

    const countDisLike = await IsLiked.count({
      video: videoId,
      isLikes: false,
    });

    const Liked = await IsLiked.findOne({
      user: userId,
      video: videoId,
      isLikes: true,
    });

    // Người dùng đã nhấn dislike
    const DisLiked = await IsLiked.findOne({
      user: userId,
      video: videoId,
      isLikes: false,
    });
    // Xem nguời dùng đã nhấn đăng ký chưa
    const Subscribed = await Subscribe.findOne({
      subscribeUser: userId,
      subscribeChannel: channelUserId?.user,
      subscribe: true,
    });

    const result = {
      like: countLike,
      dislike: countDisLike,
      subscribe: countSubscribe,
      Liked: Liked,
      DisLiked: DisLiked,
      Subscribed: Subscribed,
    };
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getSubOnlyUser = async(req, res, next)=> {
  try{
    const userId = req?.user?.userInfo?._id;
    const countSubscribe = await Subscribe.count({
      subscribeChannel: userId,
      subscribe: true,
    });

    return res.status(200).json(countSubscribe)
    
  }catch(error){
    next(error)
  }
}

export const subscribe = async (req, res, next) => {
  try {
    const userId = req?.user?.userInfo?._id;
    const videoId = req.params?.videoId;
    const channelUserId = await Video.findById(videoId);

    const checkSubscribe = await Subscribe.findOne({
      subscribeUser: userId,
      subscribeChannel: channelUserId?.user,
    });
    if (checkSubscribe) {
      if (!checkSubscribe.subscribe) {
        await checkSubscribe.updateOne({
          subscribeUser: userId,
          subscribeChannel: channelUserId?.user,
          subscribe: true,
        });
        return res.status(200).send("Đăng ký người dùng thành công");
      } else {
        await checkSubscribe.updateOne({
          subscribeUser: userId,
          subscribeChannel: channelUserId?.user,
          subscribe: false,
        });
        return res.status(200).send("Hủy đăng ký người dùng thành công");
      }
    }
    const subscribeUser = new Subscribe({
      subscribeUser: userId,
      subscribeChannel: channelUserId?.user,
      subscribe: true,
    });
    subscribeUser.save();
    return res.status(200).send("Đăng ký người dùng thành công"); // Đây là người hợp ngoại lệ khi người dùng chưa đăng ký hoặc hủy đăng ký mà chỉ tạo bảng
  } catch (error) {
    next(error);
  }
};

export const allChannelSub = async (req, res, next) => {
  try {
    const userId = req?.user?.userInfo?._id;
    const handlers = [];
    
    const AllUserSub = await Subscribe.find({
      subscribeUser: userId,
      subscribe: true,
    }).populate("subscribeChannel");
    
    AllUserSub.map((user) => {
      const countSub = user.subscribeChannel._id.toString()
      handlers.push(
        Subscribe.count({
          subscribeChannel: countSub,
          subscribe: true,
        }).then((countSubscribe) => {
            user._doc.totalSubscribe = countSubscribe
            return user._doc 
        })
      )
    })
    const final = await Promise.all(handlers);
    res.status(200).json(final);

  } catch (error) {
    next(error);
  }
};

export const history = async (req, res, next) => {
    const userId = req?.user?.userInfo?._id;
    const videoId = req.params.videoId;

    if(!userId) return console.log("xem chùa") 

    try{
      const statusHistory = await History.findOne({
        user: userId,
        video: videoId,
      });

      const video = await Video.findOne({
        _id: videoId,
      }) 

      if(videoId) {
        if(!statusHistory) {
          const watched = new History({
            watched: true,
            user: userId,
            video: videoId,
            userVideo: video.user
          });
            watched.save();
            return console.log("Tạo mới và đã lưu video")
        }
        if(statusHistory) {
          await History.findOneAndDelete({
            watched: true,
            user: userId,
            video: videoId,
            userVideo: video.user
          })
          
          new History({
            watched: true,
            user: userId,
            video: videoId,
            userVideo: video.user
          }).save()
          return console.log("Đã lưu video")
        }
      }

    } catch(error){
      next(error)
    }
}

export const getHistory = async (req, res, next) =>{
    const userId = req?.user?.userInfo?._id;
    try{
      const getVideoWatched = await History.find(
        { 
          user: userId.toString(),
          watched:true
        }
      ).populate("video").populate("userVideo");
      return res.status(200).json(getVideoWatched)

    }catch(error){
      next(error)
    }
}

// export const deleteUser = async (req, res, next) => {
//   if (req.params.id === req.user.id) {
//     try {
//       await User.findByIdAndDelete(req.params.id);
//       res.status(200).json("User has been deleted.");
//     } catch (err) {
//       next(err);
//     }
//   } else {
//     return next(createError(403, "You can delete only your account!"));
//   }
// };

// export const getUser = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.params.id);
//     res.status(200).json(user);
//   } catch (err) {
//     next(err);
//   }
// };

// export const unsubscribe = async (req, res, next) => {
//   try {
//     try {
//       await User.findByIdAndUpdate(req.user.id, {
//         $pull: { subscribedUsers: req.params.id },
//       });
//       await User.findByIdAndUpdate(req.params.id, {
//         $inc: { subscribers: -1 },
//       });
//       res.status(200).json("Unsubscription successfull.")
//     } catch (err) {
//       next(err);
//     }
//   } catch (err) {
//     next(err);
//   }
// };
