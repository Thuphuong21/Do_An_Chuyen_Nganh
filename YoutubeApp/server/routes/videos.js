import express from "express";
// import { addVideo, addView, getByTag, getVideo, random, search, sub, trend } from "../controllers/video.js";
import { 
    uploadVideo,
    completeVideo,
    getVideo,
    allVideo,
    updateInfoVideo,
    listSearch,
    deleteVideo,
    addView
} from "../controllers/video.js"
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// //create a video
// router.put("/:id", verifyToken, addVideo)
// router.delete("/:id", verifyToken, addVideo)
// router.get("/find/:id", getVideo)
// router.put("/view/:id", addView)
// router.get("/trend", trend)
// router.get("/random", random)
// router.get("/sub",verifyToken, sub)
// router.get("/tags", getByTag)

// router.post("/", verifyToken, addVideo)


router.get("/allVideo", allVideo)
router.get("/listSearch", listSearch)

// Video này là của người dùng nào
router.get("/:id", getVideo)
router.put("/view/:id", addView)

router.post("/uploadVideo", verifyToken, uploadVideo)

router.patch("/:id", verifyToken, completeVideo)
router.patch("/updateInfoVideo/:idVideo", verifyToken , updateInfoVideo)
router.delete("/deleteVideo/:idVideo", verifyToken , deleteVideo)

export default router;