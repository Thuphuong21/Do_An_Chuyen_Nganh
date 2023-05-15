import mongoose from "mongoose"
import {Schema} from "mongoose"

const History = new mongoose.Schema(({ 
    watched: { type: Boolean },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    userVideo:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    video:{
        type: Schema.Types.ObjectId,
        ref: 'Video'
    },

}),{timestamps:true },{collection: ['users', 'videos']})

export default mongoose.model("history", History)