import { DisableEventSlice } from './utilSlice'


export const disableAllEvent = (event,dispatch,disableSelector) => {
    const searchTop = event.target.closest("#searchTop")
    const dotTop = event.target.closest("#dotTop")
    const avatarTop = event.target.closest("#avatarTop")
    const streamTop = event.target.closest("#streamTop")
    const searchProfile = event.target.closest("#searchProfile")
    const avatarProfile = event.target.closest("#avatarProfile")
    const streamProfile = event.target.closest("#streamProfile")
    
    const arrDisables = [
        searchTop, 
        dotTop, 
        avatarTop,
        streamTop,
        searchProfile,
        avatarProfile,
        streamProfile,
    ] 
    arrDisables.forEach( (arrDisable) => {
      // B1: Lọc những thứ khi click vào khác null
        if(arrDisable !== null){
     // B2: Trong if này sẽ những biến đang hoạt động tức là người dùng đang click vào biến đó
            const varActionID = arrDisable.id
            if(disableSelector["varAction"] !== varActionID){
                dispatch(
                    DisableEventSlice.actions.disable({varAction:varActionID})
                )
            }
        }
    })

    // TODO: code như này cũng được nhưng không tối ưu vì mỗi lần click ra ngoài là phải gửi dispatch rồi render lại toàn bộ
    const handleOutside = arrDisables.every((arrDisable) => arrDisable === null)
    if(handleOutside === true) {
        if(disableSelector["varAction"] !== ""){
            dispatch(
                DisableEventSlice.actions.disable({varAction:""})
            )
        }
    }
}


