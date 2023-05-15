import mongoose from "mongoose"
import {Schema} from "mongoose"

const IsLiked = new mongoose.Schema(({ 
    isLikes: { type: Boolean },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    video:{
        type: Schema.Types.ObjectId,
        ref: 'Video'
    },
    // views: { type: Number,default: 0 },
    // tags: { type:[String], default: [] },
}),{timestamps:true }, {collection: ['users', 'videos']})

export default mongoose.model("IsLiked", IsLiked)