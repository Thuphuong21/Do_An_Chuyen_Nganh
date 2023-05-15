import { createSlice } from "@reduxjs/toolkit";

const varDisable = {
    disable:{
        varAction: "",
        searchTop: true,
        dotTop: true,
        streamTop: true,
        avatarTop: true,
        searchProfile: true,
        avatarProfile: true,
        streamProfile: true,
    }
}

const initialState = { 
    ...varDisable,
}


export const DisableEventSlice = createSlice({
    name: 'disableAllEvent',
    initialState,
    reducers:{
        disable:(state,action) => {
// TODO: Lấy tất cả giá trị của key trừ varAction và gắn cho bằng true mặc định
            const allDisables = {...state.disable}
            delete state.disable.varAction
            for(const property in allDisables){
                state.disable[property] = true
            }
// TODO: Sau khi mặc định là tất các cho true thì đứa nào gửi lên thì đứa đó chính là false
            state.disable[action.payload["varAction"]] = false
            void(
                state.disable = {...state.disable, ...action.payload }
            )
        }
    }
})



