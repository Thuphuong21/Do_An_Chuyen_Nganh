import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { serverAPI } from '../utils/axios'

export const checkLogin = createAsyncThunk(
    'user/login', async () => {
      const res = await serverAPI.get("/auth/user")
      console.log(res.data)
      return res.data
    }
  )

export const logOut = createAsyncThunk(
    'user/logout', async () =>{
      const res = await serverAPI.get("/auth/logOut")
      console.log(res)
      return res.data
    }
)

export const infoApi = createSlice({
    name: "apiUser",
    initialState:
      {
        currentInfo: null, 
        status: 'idle',
      },
    reducers:{},
    extraReducers: builder => {
      builder
        .addCase(checkLogin.pending,(state ) => {
          state.status = "pending"
        })
        .addCase(checkLogin.fulfilled, (state, action) => {
          state.status = "succeeded"
          state.currentInfo = action.payload
        })
        .addCase(checkLogin.rejected,(state,action) => {
          state.status = "failed";
          state.currentInfo = null;
        })
        .addCase(logOut.pending,(state ) => {
          state.status = "pending"
        })
        .addCase(logOut.fulfilled,(state,action)=>{
          state.status = "idle";
          state.currentInfo = action.payload;
        })
        .addCase(logOut.rejected,(state) => {
          state.loading = "failed";
        })
    }
})
