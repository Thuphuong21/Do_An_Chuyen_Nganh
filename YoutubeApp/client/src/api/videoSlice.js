import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { serverAPI } from '../utils/axios'

export const sendVideo = createAsyncThunk(
    'all/Video', async () =>{
      const res = await serverAPI.get("/videos/allVideo")
      return res.data
    }
)

export const videoSlice = createSlice({
    name:"allVideo",
    initialState:{
        status: 'idle',
        allVideo: null 
    },
    reducers:{},
    extraReducers: builder => {
        builder
        .addCase(sendVideo.pending,(state ) => {
            state.status = "pending"
        })
        .addCase(sendVideo.fulfilled,(state,action ) => {
            state.status = "succeeded";
            state.allVideo = action.payload
        })
        .addCase(sendVideo.rejected,(state ) => {
            state.status = "failed"
        })
    }
})