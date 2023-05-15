import { createSlice } from "@reduxjs/toolkit";

const changeInterface = {
    mode:{
        modeCurrent: "modeDark", 
        modeLight :{name: "Sáng",feature: false,},
        modeDark :{name: "Tối",feature: true,},  
    }
}  

const initialState = {
    ...changeInterface,
}
export const InterfaceSlice = createSlice({
        name: 'interface',
        initialState,
        reducers:{
            Mode: (state,action) => {
                // TODO: B1: Thiết lập tất cả feature về false
                const allModes = {...state.mode}
                delete allModes.modeCurrent
                for(const property in allModes){
                    state.mode[property].feature = false
                }
                //TODO: B2: Khi action lên chế độ nào ("modeLight", "modeDark") thì feature cái đó là true 
                state.mode[action.payload["modeCurrent"]].feature = true
                // TODO: Void cũng được không void cũng được vì state.mode sẽ lý trước khi trả về một giá trị cụ thể
                void (
                    state.mode = { ...state.mode,...action.payload }
                )
            }
        }
    })