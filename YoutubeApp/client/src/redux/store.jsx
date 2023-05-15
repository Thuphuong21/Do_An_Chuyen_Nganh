import { configureStore} from '@reduxjs/toolkit'
// import thunk from 'redux-thunk'
import { InterfaceSlice } from '../modal/modalSlice'
import { DisableEventSlice } from '../utils/utilSlice'
import { videoSlice } from '../api/videoSlice'
import { infoApi } from '../api/infoApi'

const store = configureStore({
    reducer:{
        modeInterface: InterfaceSlice.reducer,
        disableAllEvent: DisableEventSlice.reducer,
        infoApi: infoApi.reducer,
        videoInfo: videoSlice.reducer, 
    },
})

export default store
