import mongoose from "mongoose";

const Schema = mongoose.Schema

//TODO : require là yêu cầu trường nhập phải có , unique là trường duy nhất nếu trùng là báo lỗi
const UserSchema = Schema({
    username:{type:String, required: true, unique: true},
    fullname:{type:String, required: true},
    password:{type:String, required: true},
    // email:{ type: String, index: true, unique: true },
    imgAvatarUrl:{type: String,default:"/avatars/avatar.png"},
    imgCoverImageUrl: {type: String}, // Ảnh bìa
    fromGoogle:{type: Boolean,default: false,},
    videos: [{ type: Schema.Types.ObjectId, ref: 'Video' }],
},{timestamps:true},);

export default mongoose.model("User", UserSchema)