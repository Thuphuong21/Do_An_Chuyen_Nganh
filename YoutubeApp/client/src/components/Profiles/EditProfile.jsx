import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import avatar from "../../assets/image/avatar.png"
import { allInfoApi } from '../../redux/selectors'
import { toast, ToastContainer } from 'react-toastify';
import { useForm } from 'react-hook-form';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'
import { serverAPI } from '../../utils/axios'
import { useNavigate } from 'react-router-dom'
import { checkLogin } from '../../api/infoApi'

const Container = styled.div`
    background-color: ${({theme}) => theme.bg};
    color: ${({theme}) => theme.text};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height:100%;
`
const Wrapper = styled.form`
    background-color: ${({theme}) => theme.bgLighter};
    max-width:80%;
    border-radius: 10px;
`
const Title = styled.div`
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    padding-top: 30px;
`
const  Avatar = styled.div`
    display: flex;
    flex-direction: column;
`
const EditAvatar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
`
const UserInfo = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 0 20px;
    gap:20px;

`
const ImageAvatar = styled.img`
    width:150px;
    height:150px;
    align-self: center;
    border-radius: 900px;
    object-fit: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%;
`
const EditInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap:20px;
`
const Text = styled.div`
    
`

const Hr = styled.hr`
  margin: 10px 0px;
  border: 0.5px solid ${({theme}) => theme.soft};
`
const Update = styled.div`
    max-width: 200px;
    min-width: 200px;
`
const InputName = styled.input`
    padding:8px 12px;
    border-radius: 5px;
    border:1px solid rgba(0,0,0,0.25);
    outline: unset;
    width: 250px;
    max-width: 300px;
    min-width: 300px;

`
const Button = styled.button`
    border-radius:3px;
    border:none;
    padding:12px 20px;
    font-weight:500;
    cursor: pointer;
    background-color:#36A420;
    color:white;
    margin:10px;
`

const FailsReq = styled.div`
    position: relative;
    color:#BE4B49;
`

const AvatarImage= styled.input`

`
const EditProfile = () => {   

    const apiUserInfo = useSelector(allInfoApi)
    const { register, handleSubmit,formState: { errors }} = useForm()
    const [showImg, setShowImg] = useState(null)
    const fileImage = useRef(null)
    const dataImage = useRef(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const handleEditProfile = (data) => {
        const formDataUser = new FormData()
        formDataUser.append("updateUser",  JSON.stringify(data))
        formDataUser.append("avatar", dataImage.current)

        const res = serverAPI({
            method: 'patch',
            url: `/users/${apiUserInfo.userInfo._id}`, 
            data:formDataUser,
        })

        toast.promise(
            res,
                {
                    pending:{
                        render(data){
                            console.log(data)
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
                            return data.response.data+ "🤯"
                        } 
                    },
                },
                {
                    onClose (){
                        res.then((res) => {
                            dispatch(checkLogin())
                            navigate("/")
                        })
                        .catch((errors) => {
                           console.log(errors)
                        })
                    }
                },
        )
        
    }
    
    const handlePreview = () => {
        const imgOrigin = fileImage.current.files[0];
        dataImage.current = imgOrigin
        setShowImg(URL.createObjectURL(imgOrigin))
    }

    const handleEditImage = () => {
        fileImage.current.click()
    }
    
  return (
    <Container>
        <Wrapper onSubmit={handleSubmit(handleEditProfile)}>
            <EditInfo>
                <Title>Chỉnh sửa thông tin cá nhân</Title>
                <Hr />
                <Avatar>
                    <EditAvatar>
                        <Text>Ảnh đại diện</Text>
                        <div 
                            style={{cursor:"pointer"}}
                            onClick={handleEditImage}
                        >
                            Chỉnh sửa
                        </div>
                        <AvatarImage
                            type="file"
                            ref={fileImage} 
                            style={{
                                display:"none"
                            }}
                            onChange={handlePreview}
                            accept="image/*"
                        />
                    </EditAvatar>
                    <ImageAvatar src={showImg || avatar } />
                </Avatar>
                <EditInfo>
                    <UserInfo>
                        <Update>
                            <Text>Cập nhật tên của bạn</Text>
                        </Update>
                        <InputName 
                                type="text"
                                placeholder={apiUserInfo.userInfo.fullname}
                                {...register("fullname", {required: true})}            
                        />
                    {(errors?.updateName?.type === "required") && <FailsReq><PriorityHighIcon /></FailsReq>}
                    </UserInfo>
                    <UserInfo>
                        <Update>
                            <Text>Cập nhật địa chỉ email</Text>
                        </Update>
                            <InputName 
                                type="text"
                                placeholder='duchuy@gmail.com'
                                disabled
                            />
                        <Text>Chỉnh sửa</Text>
                    </UserInfo>

                    <UserInfo>
                        <Update>
                            <Text>Cập nhật ngày sinh</Text>
                        </Update>
                        <InputName 
                                type="date"
                                disabled
                        />
                    </UserInfo>
                    
                    <UserInfo>
                        <Update>
                            <Text>Thay đổi mật khẩu cũ</Text>
                        </Update>
                            <InputName 
                                type="password"
                                placeholder='Nhập mật khẩu cũ hiện tại '
                                {...register("password", {required: true})}            
                            />
                        {(errors?.passCurrent?.type === "required") && <FailsReq><PriorityHighIcon /></FailsReq>}
                    </UserInfo>
                    <UserInfo>
                        <Update>
                            <Text>Thay đổi mật khẩu mới</Text>
                        </Update>
                            <InputName 
                                type="password"
                                placeholder='Nhập mật mới'
                                {...register("passNew", {required: true})}            
                            />
                        {(errors?.passNew?.type === "required") && <FailsReq><PriorityHighIcon /></FailsReq>}

                    </UserInfo>
                    <UserInfo>
                        <Update>
                            <Text>Nhập lại mật khẩu mới</Text>
                        </Update>
                            <InputName 
                                type="password"
                                placeholder='Nhập lại mật khẩu mới'
                                {...register("enterPassNew", {required: true})}            
                            />
                        {(errors?.enterPassNew?.type === "required") && <FailsReq><PriorityHighIcon /></FailsReq>}
                    </UserInfo>
                </EditInfo>
                <Button type="submit">Cập nhật</Button>
            </EditInfo>
            <ToastContainer />
        </Wrapper>
    </Container>
  )
}

export default EditProfile