import mongoose from "mongoose"
import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { createError } from "../error.js"

import jwt from "jsonwebtoken"

export const signUp = async(req,res,next) =>{
    try{
        const salt = bcrypt.genSaltSync(10) // chi phí xử lý dữ liệu. (mặc định - 10)
        // TODO  param 1 data: dữ liệu được mã hóa. param 2 salt: được sử dụng để băm mật khẩu
        const hash = bcrypt.hashSync(req.body.password, salt) 
        // TODO thêm data gửi lên khi đăng ký vào đối tượng User và password được mã hóa
        const newUser = new User({ ...req.body, password: hash })
        await newUser.save()
        const username = await User.findOne({ username: req.body.username })
        const token = jwt.sign({ id: username._id }, process.env.JWT)
        const { password, ...others } = username._doc
        res
          .cookie("access_token", token, {
            httpOnly: true,
          })
          .status(200)
          .json(others)
          .send("Đăng ký tạo tài khoản thành công")
    }
    catch(err){
      if(err.errors){
        for (const error in err.errors) {
          next(createError(400, error + " yêu cầu phải có"))
        }
        return
      }

      if(err.keyValue){
        const error = err.keyValue.username
        next(createError(400, error+ " đã tồn tại rồi"))
        return
      }

    }
}

export const signIn = async (req, res, next) => {
    try {
      // Bước 1: Xác thực
      // Kiếm tra Username tồn tại không
      // findOne tìm giá trị của key username nào. Nếu có chỉ trả về đối tượng có username đó
      const username = await User.findOne({ username: req.body.username })
      if (!username) return next(createError(404, "Tài khoản không tồn tại"))
      // Kiểm tra mật khẩu đúng không
      // compare para 1 req.body.password dữ liệu để so sánh , para2 username.password dữ liệu được so sánh với
      const isCorrect = await bcrypt.compare(req.body.password, username.password)
      if (!isCorrect) return next(createError(400, "Mật khẩu không đúng?"))
      
      // Bước 2: ủy quyền
      const token = jwt.sign({ id: username._id }, process.env.JWT)
      // Lấy ra password còn lại trả về lại cho client
      const { password, ...others } = username._doc
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(others);
    } catch (err) {
      next(err);
    }
  };

export const logOut = async(req,res,next) =>{
  try {
    res
      .clearCookie("access_token")
      .json(null)
      .end() 
  }catch (err) {
     next(err);
  }    
  }
  
  // export const googleAuth = async (req, res, next) => {
  //   try {
  //     const user = await User.findOne({ email: req.body.email });
  //     if (user) {
  //       const token = jwt.sign({ id: user._id }, process.env.JWT);
  //       res
  //         .cookie("access_token", token, {
  //           httpOnly: true,
  //         })
  //         .status(200)
  //         .json(user._doc);
  //     } else {
  //       const newUser = new User({
  //         ...req.body,
  //         fromGoogle: true,
  //       });
  //       const savedUser = await newUser.save();
  //       const token = jwt.sign({ id: savedUser._id }, process.env.JWT);
  //       res
  //         .cookie("access_token", token, {
  //           httpOnly: true,
  //         })
  //         .status(200)
  //         .json(savedUser._doc);
  //     }
  //   } catch (err) {
  //     next(err);
  //   }
  // };