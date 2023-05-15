import express from "express";
import { 
    addComment,
    getComments, 
    deleteComment,
    editComment
} from "../controllers/comment.js";
import {verifyToken} from "../verifyToken.js"

const router = express.Router();

router.post("/:videoId", verifyToken, addComment)
router.get("/:videoId", getComments)
router.get("/:commentId/deleteComment", verifyToken, deleteComment)
router.patch("/:commentId/editComment", verifyToken, editComment)


export default router;