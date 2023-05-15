import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import imgGoogle from "../assets/image/google.png"
import styled from "styled-components"
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'
import { serverAPI } from '../utils/axios'
import { useForm } from "react-hook-form";
import { checkLogin } from '../api/infoApi'
import { useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:center ;
    height:100%;
`
const Form = styled.form`
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color:${({theme}) => theme.bgLighter};
    border: 1px solid ${({theme}) => theme.soft};
    color:${({theme}) => theme.text};
    gap:30px;
    width:350px;
    max-width: 350px;
    min-height:550px;
    border-radius: 20px;
    position: relative;
`
const Title = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap:12px;
    padding-top:25px;
`
const WordTitle = styled.h1`
    font-size:24px ;
`
const SubTitle = styled.h2`
    font-size:20px;
    font-weight: 300;
`

const Input = styled.input`
    border:1px solid ${({theme}) => theme.soft};
    border-radius: 3px;
    padding:10px;
    background-color: transparent;
    width:100%;
    color: ${({theme}) => theme.text};
`
const Button = styled.button`
    border-radius:3px;
    border:none;
    padding:12px 20px;
    font-weight:500;
    cursor: pointer;
    background-color:#36A420;
    color:white;
`
const BtnGoogle = styled.div`
    background-color: #4263F7;
    width:100%;
    border-radius: 5px ;
    display: flex;
    align-items: center;
    padding:8px 12px;
    color:white;
    display: flex;
    justify-content: center;
    gap:16px;
    cursor: pointer;
`
const ImgGoogle = styled.img`
    width:30px;
    height:30px;
    background-color: white;
    border-radius: 900px;
    padding: 5px;
`
const Hr = styled.hr`
  border: 0.5px solid ${({theme}) => theme.soft};
  width:100%;
`
const MethodOr = styled.div`
    position: relative;
    width: 100%;
    padding: 0 25px;
`
const Or = styled.pre`
    padding:8px 12px;
    background-color: ${({theme}) => theme.bgLighter};
    position: absolute;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
    z-index: 99;
`
const EnterData = styled.div`
    display: flex;
    flex-direction:column;
    width:100%;
    gap:12px;
`
const Data = styled.div`
    display: flex;
    position: relative;
    padding: 0 25px;
`
const HaveAccount = styled.div`
    display: flex;
    gap:12px;
    padding-bottom: 25px;
`
const WordLogin = styled.pre`
    cursor: pointer;
    color:#0F5986;
`
const FailsReq = styled.pre`
    position: absolute;
    right:0;
    top:0;
    transform: translate(-100%, 25%);
    color:#BE4B49;
`

const Px25 = styled.div`
    padding: 0 25px;
    width:100%;
`
const SignIn = () => {
    console.log("signIn")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit,formState: { errors }} = useForm()

    const onSubmit = async (dataSignIn) =>{   
        const res = serverAPI({
                method: 'post',
                url: '/auth/signIn',
                data: dataSignIn
        })
        toast.promise(
            res,
                {
                    pending:{
                        render(){
                            return "Đang chờ xử lý"
                        },
                    },
                    success:{
                        render({data}){
                            return "Đăng nhập tài khoản " + data?.data?.username + " thành công 👌"
                        }
                    },
                    error: {
                        render({data}){
                            return data?.response?.data?.message+ " 🤯"
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

  return (
    <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Title>
                <WordTitle>Đăng Nhập</WordTitle>
                <SubTitle>Tiếp Tục Đăng Nhập Với Youtube</SubTitle>
            </Title>
            <EnterData>
                <Data>
                    <Input 
                        type="text" 
                        placeholder="Tên đăng nhập"
                        {...register("username",{required: true})}
                    />
                    {(errors?.username?.type === "required") && <FailsReq><PriorityHighIcon /></FailsReq>}
                </Data>
                <Data>
                    <Input 
                        type="password" 
                        placeholder= "Nhập mật khẩu"
                        {...register("password",{required: true})}
                    />
                    {(errors?.password?.type === "required") && <FailsReq><PriorityHighIcon /></FailsReq>}
                </Data>
            </EnterData>
            <Button type="submit">Đăng Nhập</Button>
            <MethodOr>  
                <Hr />
                <Or>Or</Or>
            </MethodOr>
            <Px25>
                <BtnGoogle>
                    <ImgGoogle src={imgGoogle}/>
                    Đăng Nhập với Google
                </BtnGoogle>
            </Px25>
            <HaveAccount>
                Bạn chưa có tài khoản?
                <Link to="/signUp" style={{textDecoration:"none"}}>
                    <WordLogin>Đăng Ký</WordLogin>
                </Link>
            </HaveAccount>
            <ToastContainer />
        </Form>
    </Container>
  )
}

export default SignIn