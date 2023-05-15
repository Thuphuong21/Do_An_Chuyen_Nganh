import React, { useRef } from "react";
import { useState } from "react";
import ModalTop from "./ModalTop";
import { Link, useNavigate } from "react-router-dom";
import { allInfoApi, disableEventAllSelector } from "../../redux/selectors";
import { useSelector } from "react-redux";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardAltOutlinedIcon from "@mui/icons-material/KeyboardAltOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MicNoneIcon from "@mui/icons-material/MicNone";
import VoiceChatOutlinedIcon from "@mui/icons-material/VoiceChatOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import avatarDefault from "../../assets/image/avatar.png";

// start code css internal
const Styles = {
  fontSize_18px: {
    fontSize: "18px",
  },
};
// end code css internal

const Container = styled.div`
  grid-area: header;
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  z-index: 99;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0 20px;
  position: relative;
  gap: 30px;
  height: 56px;
  max-height: 56px;
`;
const Search = styled.form`
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: inherit;
  max-width: 650px;
`;
const SeachMain = styled.div`
  flex: auto;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  color: ${({ theme }) => theme.text};
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  position: relative;
`;
const AllInputBox = styled.div`
  background-color: ${({ theme }) => theme.bgInputTop};
  display: flex;
  flex: auto;
  border: ${({ typeInput }) =>
    typeInput === false ? "1px solid #065fd4" : "1px solid rgba(0,0,0,0.25)"};
  border-radius: ${({ typeInput }) =>
    typeInput === false ? "unset" : "2px 0 0 2px"};
  border-left: ${({ typeInput }) => (typeInput === false ? "unset" : "")};
  box-shadow: ${({ typeInput }) =>
    typeInput === false
      ? "inset -1.5px 1px 1px rgba(0,0,0,.15), inset -1px 1px 1px rgba(0,0,0,.15)"
      : "inset 0 1px 2px rgba(0,0,0, .25)"};
  margin-left: ${({ typeInput }) => (typeInput === false ? "0" : "28px")};
  background-color: ${({ theme }) => theme.typeInput};
`;
const InputSearch = styled.input`
  background-color: transparent;
  outline: none;
  padding: 8px;
  font-size: 16px;
  flex: auto;
  border: unset;
  color: inherit;
`;
const Dot = styled.div`
  position: relative;
  cursor: pointer;
`;

const KeyBoard = styled.div`
  align-self: stretch;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
  padding-right: 10px;
`;
const Button = styled.button`
  padding: 8px 15px;
  background-color: transparent;
  border: 1px solid #065fd4;
  color: #065fd4;
  border-radius: 1px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
`;
const IconSearchBefore = styled.div`
  background-color: ${({ theme }) => theme.bgInputTop};
  align-self: stretch;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
  padding-left: 10px;
  border-radius: 2px 0 0 2px;
  border: ${({ iconBefore }) =>
    iconBefore === false ? "1px solid #065fd4" : "unset"};
  border-right: ${({ iconBefore }) =>
    iconBefore === false ? "none" : "unset"};
  box-shadow: ${({ iconBefore }) =>
    iconBefore === false
      ? "inset 1.5px 1px 1px rgba(0,0,0,.15), inset 1px 1px 1px rgba(0,0,0,.15)"
      : "unset"};
  position: ${({ iconBefore }) =>
    iconBefore === false ? "unset" : "absolute"};
  display: ${({ iconBefore }) => (iconBefore === false ? "flex" : "none")};
`;
const IconSearchAfter = styled.button`
  align-self: stretch;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.soft};
  padding: 0 18px;
  flex: none;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  cursor: pointer;
  outline: unset;
  border: unset;
  color:inherit;
`;
const IconMic = styled.div`
  align-self: stretch;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 18px;
  color: inherit;
  flex: none;
  margin: 0 10px;
  border-radius: 900px;
  padding: 0 8px;
`;
const IconTop = styled.div`
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 900px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 12px;
  position: relative;

  :hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;


const Navbar = () => {
  console.log("Navbar");
  const disableSelector = useSelector(disableEventAllSelector);
  const apiUserInfo = useSelector(allInfoApi);
  const avatarUser = `${process.env.REACT_APP_STORAGE_VIDEO_BASE_URL}${apiUserInfo?.userInfo?.imgAvatarUrl}`;

  const navigate = useNavigate()
  const [showModal, setShowModal] = useState({
    dotTop: false,
    streamTop: false,
    avatarTop: false,
  });
  const getValueSearch = useRef()

  // let timeoutSearch
  // const handleValueSearch = (e) => {
  //   clearTimeout(timeoutSearch)
  //   timeoutSearch = setTimeout(()=>{
  //       const dataValueInput = e.target.value
  //       setValueSearchTop(dataValueInput)
  //   },550)
  // }
  
  
  const onFormSubmitSearch = (e) => {
    e.preventDefault();
    const search = {
      search_query: getValueSearch.current.value,
    }
    navigate({ pathname: "/filterVideo/", search: new URLSearchParams(search).toString() })
  }

  const handleDotTop = () => {
    const preDotTop = { ...showModal };
    if (disableSelector.dotTop === true) {
      preDotTop.dotTop = false;
    }
    preDotTop.dotTop = !preDotTop.dotTop;
    setShowModal(preDotTop);
  };

  const handleStream = () => {
    const preStreamTop = { ...showModal };
    if (disableSelector.streamTop === true) {
      preStreamTop.streamTop = false;
    }
    preStreamTop.streamTop = !preStreamTop.streamTop;
    setShowModal(preStreamTop);
  };

  const handleAvatarTop = () => {
    const preAvatarTop = { ...showModal };
    if (disableSelector.avatarTop === true) {
      preAvatarTop.avatarTop = false;
    }
    preAvatarTop.avatarTop = !preAvatarTop.avatarTop;
    setShowModal(preAvatarTop);
  };

  return (
    <Container>
      <Wrapper>
        <Search id="searchTop" onSubmit={onFormSubmitSearch}>
          <SeachMain>
            <InputWrapper>
              <IconSearchBefore iconBefore={disableSelector.searchTop}>
                <SearchIcon style={Styles.fontSize_18px} />
              </IconSearchBefore>
              <AllInputBox typeInput={disableSelector.searchTop}>
                <InputSearch
                  type="text"
                  placeholder="Tìm kiếm"
                  name="search_query"
                  ref={getValueSearch}
                />
                <KeyBoard>
                  <KeyboardAltOutlinedIcon/>
                </KeyBoard>
              </AllInputBox>
            </InputWrapper>
          </SeachMain>
          <IconSearchAfter type="submit">
            <SearchIcon />
          </IconSearchAfter>
          <IconMic>
            <MicNoneIcon />
          </IconMic>
        </Search>
        {apiUserInfo === null ? (
          <>
            <Dot id="dotTop" onClick={handleDotTop}>
              <MoreVertIcon />
              {showModal.dotTop === true &&
                disableSelector.dotTop === false && <ModalTop />}
            </Dot>
            <Link to="/signIn" style={{ textDecoration: "none" }}>
              <Button>
                <AccountCircleOutlinedIcon />
                ĐĂNG NHẬP
              </Button>
            </Link>
          </>
        ) : (
          <>
            <IconTop id="streamTop" onClick={handleStream}>
              <VoiceChatOutlinedIcon />
              {showModal?.streamTop === true &&
                disableSelector?.streamTop === false && <ModalTop />}
            </IconTop>
            <IconTop>
              <NotificationsOutlinedIcon />
            </IconTop>
            <IconTop id="avatarTop" onClick={handleAvatarTop}>
              <img
                src={avatarUser || avatarDefault}
                style={{ width: "40px", height: "40px", borderRadius: "900px" }}
                alt="avatar"
              />

              {showModal?.avatarTop === true &&
                disableSelector?.avatarTop === false && <ModalTop />}
            </IconTop>
          </>
        )}
      </Wrapper>
    </Container>
  );
};

export default Navbar;
