import { createError } from "../error.js";

// cái này là của user 
const canModify = (req, res, next) => {
    const targetId = req.params.id
    const userId = req.user.userInfo._id.toString()
    const isAdmin = false
    if(targetId === userId || isAdmin) {
        next()
        return
    }
    return res.send(createError(403, "Bạn không thể cập nhật được vì đây không phải tài khoản của bạn !!!"));
}
export {
    canModify
}