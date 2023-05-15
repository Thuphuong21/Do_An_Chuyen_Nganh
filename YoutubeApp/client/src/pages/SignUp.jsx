import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import imgGoogle from "../assets/image/google.png"
import styled from "styled-components"
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'
import { serverAPI } from '../utils/axios'
import { useForm } from "react-hook-form"
import { checkLogin } from '../api/infoApi'
import { useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:center ;
    height:100%;
    position: relative;
    overflow: hidden;
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
const Fails = styled.div`
    position: absolute;
    right:100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index:99;
    min-width: 100%;
    height:100%;
    max-height: 100%;
    background-color: #BE4B49;
    color:white;
    border-radius:5px;
    margin-left:25px;
    padding: 0 25px;

    ::before{
        content:"" ;
        position: absolute;
        left:100%;
        width:0px;
        height:0px;
        border-bottom:8px solid transparent;
        border-top:8px solid transparent;
        border-left:8px solid #BE4B49; 
    }
`
const Px25 = styled.div`
    padding: 0 25px;
    width:100%;
`


const SignUp = () => {
    console.log("SignUp")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit,formState: { errors },getValues} = useForm()


    const onSubmit = async (dataSignUp) => {

        const {enterPass,...remaining} = dataSignUp
        const res = serverAPI({
            method: 'post',
            url: 'auth/signUp',
            data: remaining
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
                            return "Đăng ký tài khoản " + data?.data?.username +" thành công 👌"
                        }
                    },
                    error: {
                        render({data}){
                            return "Ôi không tài khoản " +data?.response?.data?.message+ " 🤯"
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
                            return errors
                        })
                    }
                },
        )
         
    }

  return (
    <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Title>
                <WordTitle>Đăng Ký</WordTitle>
                <SubTitle>Tiếp Tục Đăng Ký Với Youtube</SubTitle>
            </Title>
            <EnterData>
                <Data>
                    <Input 
                        type="text" 
                        placeholder="Tên đăng nhập"
                        {...register("username",
                            { 
                                required: true,
                                minLength: 6,
                                maxLength:25,
                                pattern: /^[a-zA-Z0-9]+$/i,
                            }
                        )}
                    />
                    {(errors?.username?.type === "required") && <FailsReq><PriorityHighIcon /></FailsReq>}
                    {(errors?.username?.type === "minLength") && <Fails>Nhập tối thiểu 6 kí tự</Fails>}
                    {(errors?.username?.type === "maxLength") && <Fails>Nhập tối đa 25 kí tự</Fails>}
                    {(errors?.username?.type === "pattern") && <Fails>Vui lòng không chứa ký tự đặc biệt và khoảng trống</Fails>}
                </Data>
                <Data>
                    <Input 
                        type="text" 
                        placeholder="Tên đầy đủ" 
                        {...register("fullname",
                            { 
                                required: true,
                                minLength: 6,
                                maxLength:25,
                            }
                        )}
                    />
                    {(errors?.fullname?.type === "required") && <FailsReq><PriorityHighIcon /></FailsReq>}
                    {(errors?.fullname?.type === "minLength") && <Fails>Nhập tối thiểu 6 kí tự</Fails>}
                    {(errors?.fullname?.type === "maxLength") && <Fails>Nhập tối đa 25 kí tự</Fails>}
                    {/* {(errors?.fullname?.type === "pattern") && <Fails>Vui lòng không chứa ký tự đặc biệt và số</Fails>} */}
                </Data>
                <Data>
                    <Input 
                        type="password" 
                        placeholder= "Nhập mật khẩu"
                        {...register("password",
                            {
                                required:true,
                                minLength: 6,
                                maxLength:25
                            }
                        )}
                    />
                {(errors?.password?.type === "required") && <FailsReq><PriorityHighIcon /></FailsReq>}
                {(errors?.password?.type === "minLength") && <Fails>Nhập tối thiểu 6 kí tự</Fails>}
                {(errors?.password?.type === "maxLength") && <Fails>Nhập tối đa 25 kí tự</Fails>}
                </Data>
                <Data>
                    <Input 
                        type="password" 
                        placeholder= "Nhập lại mật khẩu" 
                        {...register("enterPass",
                            {
                                required:"Vui lòng xác nhận mật khẩu!",
                                validate:{
                                    confirmPass :(value) =>{
                                        const { password } = getValues();
                                        return password === value || "Mật khẩu nhập lại chưa đúng?";
                                    }
                                }
                            }
                        )}
                    />
                    {(errors?.enterPass?.type === "required") && <FailsReq><PriorityHighIcon /></FailsReq>}
                    {(errors?.enterPass?.type === "confirmPass") && <Fails>{errors.enterPass.message}</Fails>}
                </Data>
            </EnterData>
            <Button type="submit">Đăng Ký</Button>
            <MethodOr>  
                <Hr />
                <Or>Or</Or>
            </MethodOr>
            <Px25>
                <BtnGoogle>
                    <ImgGoogle src={imgGoogle}/>
                    Đăng ký với Google
                </BtnGoogle>
            </Px25>
            <HaveAccount>
                Bạn đã có tài khoản?
                <Link to="/signIn" style={{textDecoration:"none"}}>
                    <WordLogin>Đăng Nhập</WordLogin>
                </Link>
            </HaveAccount>
            <ToastContainer />
        </Form>
    </Container>
  )
}

export default SignUp