import React from 'react'
import { useState } from "react"
import ModalTop from '../Profiles/ModalTop'
import { allInfoApi, disableEventAllSelector} from '../../redux/selectors'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search'
import KeyboardAltOutlinedIcon from '@mui/icons-material/KeyboardAltOutlined'
import MicNoneIcon from '@mui/icons-material/MicNone'
import VoiceChatOutlinedIcon from '@mui/icons-material/VoiceChatOutlined';
import  avatarDefault  from "../../assets/image/avatar.png"
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';

// start code css internal
const Styles = {
  fontSize_18px: {
    fontSize: "18px",
  },
}
// end code css internal

const Container = styled.div`
  grid-area: header;
  position: sticky;
  top:0;
  background-color:${({theme}) => theme.bgLighter}; 
  color:${({theme}) => theme.text};
  border: 1px solid rgba(0,0,0,0.25);
  box-shadow: 0 2px 5px rgba(0,0,0,0.25) ;
  z-index: 99;
`
const Wrapper = styled.div`
  display:flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0 20px;
  position: relative;
  gap:15px;
  height:56px;
  max-height:56px;
`
const Search = styled.div`
  position: absolute;
  left:0px;
  right:0px;
  margin:auto;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color:inherit;
  max-width:650px;
`
const SeachMain = styled.div`
  flex:auto;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  color:${({theme}) => theme.text};
`

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`
const AllInputBox = styled.div`
  background-color: ${({theme}) => theme.bgInputTop};
  display:flex;
  flex:auto;
  border: ${({typeInput}) => typeInput === false ? "1px solid #065fd4": "1px solid rgba(0,0,0,0.25)" };
  border-radius: ${({typeInput}) => typeInput === false ? "unset": "2px 0 0 2px" };
  border-left: ${({typeInput}) => typeInput === false ? "unset": "" };
  box-shadow:${({typeInput}) => typeInput === false
    ?
    "inset -1.5px 1px 1px rgba(0,0,0,.15), inset -1px 1px 1px rgba(0,0,0,.15)"
    :
    "inset 0 1px 2px rgba(0,0,0, .25)"
  };
  margin-left:${({typeInput}) => typeInput === false ? "0" : "28px"};
  background-color: ${({theme}) => theme.typeInput};
`
const InputSearch = styled.input`
  background-color: transparent;
  outline:none;
  padding:8px;
  font-size: 16px;
  flex:auto;
  border:unset;
  color:inherit;
`
const KeyBoard = styled.div`
  align-self: stretch;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
  padding-right:10px;
`
const IconSearchBefore = styled.div`
  background-color: ${({theme}) => theme.bgInputTop};
  align-self: stretch;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
  padding-left:10px;
  border-radius:2px 0 0 2px;
  border: ${({iconBefore}) => iconBefore === false ? "1px solid #065fd4" : "unset" };
  border-right:  ${({iconBefore}) => iconBefore === false ? "none" : "unset" };
  box-shadow: ${({iconBefore}) => iconBefore === false ? "inset 1.5px 1px 1px rgba(0,0,0,.15), inset 1px 1px 1px rgba(0,0,0,.15)":"unset"};
  position: ${({iconBefore}) => iconBefore === false ? "unset" : "absolute"};
  display: ${({iconBefore}) => iconBefore === false ? "flex" : "none"};
`
const IconSearchAfter = styled.div`
  align-self: stretch;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({theme}) => theme.soft};
  padding: 0 18px;
  flex: none;
  border-top-right-radius: 3px ;
  border-bottom-right-radius: 3px;
`
const IconMic = styled.div`
  align-self: stretch;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 18px;
  color:inherit;
  flex:none ;
  margin: 0 10px ;
  border-radius:900px ;
  padding:0 8px ;
`
const IconTop = styled.div`
    cursor: pointer;
    width:40px;
    height:40px;
    border-radius: 900px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px 12px;
    position: relative;

    :hover{
      background-color: ${({theme}) => theme.soft};
    }
`
const Navbar = () => {
  console.log("Navbar")
  const disableSelector = useSelector(disableEventAllSelector)
  const apiUserInfo = useSelector(allInfoApi);

  const avatarUser = `${process.env.REACT_APP_STORAGE_VIDEO_BASE_URL}${apiUserInfo?.userInfo?.imgAvatarUrl}`


  const [showModal,setShowModal] = useState({
      streamProfile: false,
      avatarProfile: false,
  })
  

  const handleStreamProfile = () => {
    const preStreamProfile = {...showModal}
    if(disableSelector.streamProfile === true){
      preStreamProfile.streamProfile = false
    }
    preStreamProfile.streamProfile = !(preStreamProfile.streamProfile)
    setShowModal(preStreamProfile)
  }

  const handleAvatarProfile = () => {
    const preAvatarProfile = {...showModal}
    if(disableSelector.avatarProfile === true){
      preAvatarProfile.avatarProfile = false
    }
    preAvatarProfile.avatarProfile = !(preAvatarProfile.avatarProfile)
    setShowModal(preAvatarProfile)
  }

  return (
    <Container>
      <Wrapper>
        <Search>
          <SeachMain>
          <InputWrapper>
            <IconSearchBefore
              iconBefore={disableSelector.searchProfile}>
              <SearchIcon style={Styles.fontSize_18px} />
            </IconSearchBefore>
            <AllInputBox 
              typeInput={disableSelector.searchProfile}
            >
              <InputSearch 
                type='text'
                placeholder='Tìm kiếm trên kênh của bạn' 
                id="searchProfile"
              />
              <KeyBoard><KeyboardAltOutlinedIcon/></KeyBoard>
            </AllInputBox>
          </InputWrapper>
          </SeachMain>
          <IconSearchAfter><SearchIcon /></IconSearchAfter>
          <IconMic><MicNoneIcon/></IconMic>
        </Search>
            <IconTop>
              <HelpOutlineOutlinedIcon />
            </IconTop>
            <IconTop id ="streamProfile" onClick={handleStreamProfile}>
              <VoiceChatOutlinedIcon />
              {(showModal?.streamProfile === true && disableSelector?.streamProfile === false)
                && <ModalTop /> 
              }
            </IconTop>
            <IconTop id="avatarProfile" onClick={handleAvatarProfile}>
              <img 
                src={avatarUser || avatarDefault} 
                style={{width:"40px", height:"40px",borderRadius:"900px"}}
                alt= "avatar"
              />
              {(showModal?.avatarProfile === true && disableSelector?.avatarProfile === false)
                && <ModalTop /> 
              }
            </IconTop>
      </Wrapper>
    </Container>
  )
}

export default Navbar
