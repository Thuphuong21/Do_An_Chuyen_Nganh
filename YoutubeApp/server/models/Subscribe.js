import mongoose from "mongoose"
import {Schema} from "mongoose"

const Subscribe = new mongoose.Schema(({ 
    subscribe:{ type:Boolean},
    
    subscribeUser:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    subscribeChannel:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

}),{timestamps:true },{collection: ['users']})

export default mongoose.model("subscribe", Subscribe)