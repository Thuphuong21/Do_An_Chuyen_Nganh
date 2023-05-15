import express from "express";
import { 
    updateInfoUser,
    returnAllVideoOneUser, 
    updateCoverImageUrl,
    like,
    dislike,
    StatusVideos,
    subscribe,
    allChannelSub,
    history,
    getHistory,
    getSubOnlyUser
} from "../controllers/user.js";
import { canModify } from "../middleware/canModify.js";
import { verifyToken } from "../verifyToken.js";
const router = express.Router();



// Cập nhật ảnh bìa
router.patch("/coverImg/:id", verifyToken, canModify, updateCoverImageUrl);


//like a video
router.patch("/like/:videoId", verifyToken, like);

//dislike a video
router.patch("/dislike/:videoId", verifyToken, dislike)

// subscribe a video
router.patch("/subscribe/:videoId", verifyToken, subscribe)
router.get("/getSubscribed", verifyToken, getSubOnlyUser)

router.get("/allChannelSub", verifyToken, allChannelSub) 

router.get("/historyWatched/:videoId", verifyToken, history)
router.get("/getHistoryVideo", verifyToken, getHistory)


router.get("/:videoId/status", verifyToken, StatusVideos)

//update user
router.patch("/:id", verifyToken, canModify, updateInfoUser);

// Trả về tất cả video của một người dùng 
router.get("/:id", verifyToken, canModify, returnAllVideoOneUser);

// //delete user
// router.delete("/:id", verifyToken, deleteUser);

// //get a user
// router.get("/find/:id", getUser);



export default router;