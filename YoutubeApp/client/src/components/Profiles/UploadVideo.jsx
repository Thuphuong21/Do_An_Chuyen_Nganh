import { serverAPI } from '../../utils/axios';
import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import ReportGmailerrorredOutlinedIcon from '@mui/icons-material/ReportGmailerrorredOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined';
import { toast, ToastContainer } from 'react-toastify';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'
import { checkLogin } from '../../api/infoApi'

import {
    Player,
    ControlBar,
    PlayToggle,
    ReplayControl,
    ForwardControl,
    CurrentTimeDisplay,
    TimeDivider,
    PlaybackRateMenuButton,
    VolumeMenuButton
  } from 'video-react';
import "../../assets/video/handleVideo.css"
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { videoSlice } from '../../api/videoSlice';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    background-color: ${({theme}) => theme.bg};
    color: ${({theme}) => theme.text};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height:100%;
`
const Wrapper = styled.div`
    background-color: ${({theme}) => theme.bgLighter};
    border-radius: 10px;
`

const UploadMain = styled.form`
    display: flex;
    flex-direction: column;
    gap:30px;
`

const Top = styled.div`
    display: flex ;
    justify-content: space-between;
    padding-top: 20px;
    margin: 0 20px;
`
const Detail = styled.div`
    display: flex ;
    flex-direction: column;
    justify-content: space-between;
    gap:20px;
    padding: 0 20px;
`

const Title = styled.div`
    font-size: 20px;
    font-weight: 700;
    width:550px;
    max-width: 550px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`
const TitleThumb = styled.div`
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: 20px;
    font-weight: 700;
    width:280px;
    max-width: 280px;
    padding-bottom: 20px;
`
const IconTop = styled.div`
    display: flex;
    align-items: center;
    gap:30px;
`
const Hr = styled.hr`
  border: 0.5px solid ${({theme}) => theme.soft};
`
const UploadStart = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 30px;
`
const Upload = styled.div`
    width:150px;
    height:150px;
    background-color: ${({theme}) => theme.bg};
    border-radius: 900px;
    display:flex;
    justify-content: center;
    align-items: center;
`

const Text =  styled.div`

`
const TextSmall = styled.div`
    font-size:14px;
    color:  ${({theme}) => theme.textSoft};
`

const Label = styled.label`
    border-radius:3px;
    border:none;
    padding:12px 20px;
    font-weight:500;
    cursor: pointer;
    background-color:#2D438C;
    color:#f2f2f2;
    width: max-content; 
    font-size:14px;
    display: flex;
    gap:10px;
    align-items: center;
`
const Button = styled.button`
    border-radius:3px;
    border:none;
    padding:12px 20px;
    font-weight:500;
    cursor: pointer;
    background-color:#36A420;
    color:#f2f2f2;
    font-weight: 650;
    width: max-content;
`
const TextCenter = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Terms = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 20px;
    padding-bottom:20px;
`
const TitleVideo = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    border:1px solid rgba(0,0,0,0.25);
    box-shadow: 0 0 5px rgba(0,0,0,0.25);
    border-radius: 5px;
    padding: 5px 15px;
    position: relative;
`
const Textarea = styled.textarea`
    resize: none;
    border:unset;
    outline: unset;
    background-color: transparent;
    overflow: hidden;
    color:inherit;

`
const Introduce = styled.textarea`
    width:100%;
    min-height:150px;
    resize: none;
    border:unset;
    outline: unset;
    background-color: transparent;
    overflow: hidden;
    color:inherit;
`
const Obligatory = styled.div`
    width:100%;
    width:100%;
    display: flex;
    align-items: center;
    justify-content: start;
    gap:10px;
    background-color: transparent;
`
const TextTitle = styled.div`
    font-size: 12px;
`
const BtnForm = styled.div`
    display: flex;
    justify-content: center;
    padding-bottom:20px;
`

const VideoThumb = styled.div`
    display: flex;
    flex-direction: column;
    gap:10px;
    background-color: ${({theme}) => theme.bg};
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0,0,0,0.25);
`
const NameFile = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    gap:5px;
`
const Center = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width:500px;
`
const FailsReq = styled.div`
    position: absolute;
    right:0;
    top:0;
    transform: translate(-100%, 50%);
    color:#BE4B49;
`

const UploadVideo = () => {
    console.log("UploadVideo")

    const dispatch = useDispatch()   
    const navigate = useNavigate() 
    const uploadVideo = useRef()
    const [sourceVideo, setSourceVideo ] = useState(null)
    const [infoAll, setInfoAll] = useState(null)

    const { register, handleSubmit,formState: { errors }} = useForm()

    const handleUpload = () => {
        uploadVideo.current.click()
    }

    const handleVideoChange = async (event) => {
        const file = await event.target.files[0]
        const formData = new FormData()
        formData.append("video", file)
        const res = serverAPI({
            method: 'post',
            url: '/videos/uploadVideo', 
            data:formData,
        })
        
        toast.promise(
            res,
                {
                    pending:{
                        render(data){
                            return "Xin vui lòng chờ xử lý video"
                        },
                    },
                    success:{
                        render({data}){
                            return "Video đã được tải lên thành công! 👌"
                        }
                    },
                    error: {
                        render({data}){
                            console.log(data)
                            return "Xin vui lòng nhập đúng tệp định dạng 🤯"
                        } 
                    },
                },
                {
                    onClose (){
                        res.then((res) => {
                            console.log(res)
                            setInfoAll({
                                TitleVideo: file.name,

                            })
                            const urlVideo = `${process.env.REACT_APP_STORAGE_VIDEO_BASE_URL}${res.data.videoUrl}`
                            
                            setSourceVideo({
                                idVideo: res?.data?._id ,
                                userId: res?.data?.userId ,
                                urlVideo: urlVideo,
                                dataCreate: res?.data?.createdAt ,
                                dataUpdate: res?.data?.updatedAt
                            })

                        })
                        .catch((errors) => {
                            console.log(errors)
                        })
                    }
                },
        )
    }
    
    

    const handleComplete = async (data) => {
       const {fileImage,...dataRemaining} = data
       const formData = new FormData()
       formData.append("dataComplete",  JSON.stringify(dataRemaining))
       formData.append("image", fileImage[0])
        const res = serverAPI({
            method: 'patch',
            url: `/videos/${sourceVideo?.idVideo}`, 
            data: formData,
        })
        toast.promise(
            res,
                {
                    pending:{
                        render(data){
                            return "Xin vui lòng công đoạn đang chờ xử lý"
                        },
                    },
                    success:{
                        render({data}){
                            return "Thông tin đã được cập nhật thành công 👌"
                        }
                    },
                    error: {
                        render({data}){
                            return "Xin vui lòng nhập đúng tệp định dạng 🤯"
                        } 
                    },
                },
                {
                    onClose (){
                        res.then((res) => {
                            dispatch(checkLogin())
                            navigate("/profile/channel")
                        })
                        .catch((errors) => {
                            dispatch(videoSlice.actions.createVideoFailed())    
                        })
                    }
                },
        )
    }    

return (
    <Container>
        <Wrapper>
        {!(sourceVideo?.idVideo) 
        ? 
            <UploadMain onSubmit={handleSubmit(handleUpload)}>
                <Top>
                    <Title>Tải video lên</Title>
                    <IconTop>
                        <ReportGmailerrorredOutlinedIcon/>
                        <CloseOutlinedIcon />
                    </IconTop>
                </Top>
                <Hr />
                <UploadStart>
                    <Upload>
                        <PublishOutlinedIcon style={{width:"80px",height:"80px"}}/>
                    </Upload>
                    <TextCenter>
                            <Text>Kéo và thả tệp video để tải lên</Text>
                            <TextSmall>Các video của bạn sẽ ở chế độ riêng tư cho đến khi bạn xuất bản.</TextSmall>
                    </TextCenter>
                    <Button type="submit">Tải tệp lên</Button>
                    <input 
                        type="file" 
                        onChange={handleVideoChange}
                        ref={uploadVideo}
                        style={{display:"none"}}
                    />
                </UploadStart>
                <Terms>
                    <TextSmall>Khi gửi video lên YouTube, bạn xác nhận rằng bạn đồng ý với Điều khoản dịch vụ và Nguyên tắc cộng đồng của YouTube.</TextSmall>
                    <TextSmall>Bạn cần đảm bảo không vi phạm bản quyền hoặc quyền riêng tư của người khác. Tìm hiểu thêm.</TextSmall>
                </Terms>
            </UploadMain>
        :            
            <>
            <UploadMain onSubmit={handleSubmit(handleComplete)}>
                <Top>
                    <Title>{infoAll.TitleVideo}</Title>
                    <IconTop>
                        <ReportGmailerrorredOutlinedIcon/>
                        <CloseOutlinedIcon />
                    </IconTop>
                </Top>
                <Hr />
                <Title style={{padding: "0 20px"}}>Chi Tiết</Title>
                <Detail>
                    <div style={{display:"flex",gap:"20px"}}>
                        <Center>
                            <TitleVideo>
                                <Obligatory>
                                    <TextTitle>Tiêu đề (bắt buộc)</TextTitle>
                                    <HelpOutlineOutlinedIcon />
                                </Obligatory>
                                <Textarea
                                    placeholder= "Vui lòng nhập tiêu đề vì đây là bắt buộc!"
                                    defaultValue= {infoAll.TitleVideo}
                                    {...register("TitleVideo", {required: true})}            
                                />   
                            {(errors?.TitleVideo?.type === "required") && <FailsReq><PriorityHighIcon /></FailsReq>}
                            </TitleVideo>
                            <TitleVideo>
                                <Obligatory>
                                    <TextTitle>Mô tả</TextTitle>
                                    <HelpOutlineOutlinedIcon />
                                </Obligatory>
                                <Introduce 
                                    placeholder='Giới thiệu về video của bạn cho người xem'
                                    defaultValue=""
                                    {...register("Desc",)}            
                                />
                            </TitleVideo>
                        </Center>
                        <VideoThumb>
                            <Player className="videoThumb" videoId="videoThumb">
                                <source src={sourceVideo.urlVideo} />
                                <ControlBar >
                                    <PlayToggle />
                                    <ReplayControl seconds={10} order={1.1} />
                                    <ForwardControl seconds={30} order={1.2} />
                                    <CurrentTimeDisplay order={4.1} />
                                    <TimeDivider order={4.2} />
                                    <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1}/>
                                    <VolumeMenuButton disabled/>
                                </ControlBar>
                            </Player>
                            <NameFile>
                                <TextSmall>Tên tệp</TextSmall>
                                <TitleThumb
                                    style={{fontSize:"16px"}}
                                >{infoAll.TitleVideo}
                                </TitleThumb>
                            </NameFile>
                         </VideoThumb>
                     </div>
                </Detail>
                <Detail>
                    <Title >Hình thu nhỏ</Title>
                    <div>
                        <Label htmlFor="filesImg">
                            <>Tải ảnh lên</>
                        <input 
                            type="file" 
                            id="filesImg"
                            style={{
                                borderRadius:"900px",
                                backgroundColor:"#36A420",
                            }}
                            {...register("fileImage")}
                        />
                        </Label>
                    </div>
                </Detail>
                 <BtnForm><Button type='submit'>Hoàn thành</Button></BtnForm>
            </UploadMain>
        </>
        }
            <ToastContainer />
        </Wrapper>
    </Container>
  )
}

export default UploadVideo