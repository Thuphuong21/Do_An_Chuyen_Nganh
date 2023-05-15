import { InterfaceSlice } from "../modal/modalSlice";
import { DisableEventSlice }  from "../utils/utilSlice"
import { infoApi } from '../api/infoApi'
import { videoSlice } from "../api/videoSlice";

/* TODO: state mới khi được chạy lần 2 chính là return được trả về*/
const rootReducer = (state = {}, action) => {
    return {
        modeInterface: InterfaceSlice(state.modeInterface, action),
        disableAllEvent: DisableEventSlice(state.disableAllEvent, action),
        infoApi: infoApi(state.userInfo, action),
        videoInfo: videoSlice(state.videoInfo, action),
    }
}

export default rootReducer;


