import mongoose from "mongoose";
import {Schema} from "mongoose"

const Comment = new mongoose.Schema(
  {
    desc: {type: String},
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    video:{
        type: Schema.Types.ObjectId,
        ref: 'Video'
    },
  
},{ timestamps: true },{collection: ['users', 'videos']});

export default mongoose.model("comment", Comment);