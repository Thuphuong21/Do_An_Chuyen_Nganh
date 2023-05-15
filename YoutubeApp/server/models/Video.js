import mongoose from "mongoose";
import { Schema } from "mongoose";

const VideoSchema = new mongoose.Schema(({ 
    titleVideo:{ type:String, require:true },
    desc:{ type:String, require:true },
    imgUrl:{ type:String, require:true },
    videoUrl:{ type:String, require:true },
    user:{ type: Schema.Types.ObjectId,ref: 'User'},
    isLike:{ type: Schema.Types.ObjectId,ref: 'IsLiked'},
    views: { type: Number,default: 0 },
    // likes: { type: [String],default: [] },
    // dislikes: { type: [String],default: [] },
    // tags: { type:[String], default: [] },
}),{timestamps:true },  {collection: ['users','isLikes']})

export default mongoose.model("Video", VideoSchema)