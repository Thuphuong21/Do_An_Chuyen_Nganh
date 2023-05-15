import express from "express"
import { signUp, signIn,logOut } from "../controllers/auth.js"
import { verifyToken } from "../verifyToken.js"

// method (GET, POST, and so on).
// TODO app.METHOD(PATH, HANDLER)

const router = express.Router()
//create a user
router.post("/signUp", signUp)

// sign in
router.post("/signIn", signIn)

//logOut
router.get("/logOut", logOut)

// api get user info
router.get("/user", verifyToken, (req, res) => {
    res.send(req.user);
})

// // sign auth
// router.post("/google",)


export default router;
