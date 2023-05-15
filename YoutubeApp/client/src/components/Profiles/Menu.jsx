import React from "react";
import styled from "styled-components";
import avatarDefault from "../../assets/image/avatar.png";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import HistoryIcon from "@mui/icons-material/History";
import LibraryMusicTwoToneIcon from "@mui/icons-material/LibraryMusicTwoTone";
import SportsEsportsTwoToneIcon from "@mui/icons-material/SportsEsportsTwoTone";
import ShortTextIcon from "@mui/icons-material/ShortText";
import EmojiEventsTwoToneIcon from "@mui/icons-material/EmojiEventsTwoTone";
import FeedTwoToneIcon from "@mui/icons-material/FeedTwoTone";
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";
import OutlinedFlagIcon from "@mui/icons-material/OutlinedFlag";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { allInfoApi } from "../../redux/selectors";


const Container = styled.div`
  grid-area: menu;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.textSoft};
  overflow: hidden;
  border-right: 1px solid rgba(0, 0, 0, 0.25);
  min-width: 250px;
  max-width: 250px;
  z-index: 99;
`;
const Test = styled.div`
  display: grid;
  grid-template-areas:
    "MenuOn"
    "MenuDown";
  grid-template-rows: auto 1fr;
  grid-template-columns: auto;
  height: 100%;
  z-index: 99;
`;

const Wrapper = styled.div`
  grid-area: MenuOn;

  min-height: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-top: 8px;
`;
const InfoUser = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  max-height: 100px;
  border-radius: 900px;
`;
const Channel = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
`;

const Name = styled.div`
  font-size: 14px;
  padding: 0px 20px;
`;

const Scroll = styled.div`
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  &:hover {
    ::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.bgScroll};
      border-radius: 900px;
    }
  }
  & a{
    text-decoration: none;
    color: ${({theme})=> theme.textSoft};
  }
`;
const Img = styled.img`
  height: 100%;
`;
const Items = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 15px 20px;
  height: 40px;
  font-size: 15px;
  color:inherit;
  text-decoration: none;

  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

const Final = styled.div`
  grid-area: MenuDown;
  padding: 10px 0;
  z-index: 999;
  border: 1px solid rgba(0, 0, 0, 0.25);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
`;

const Menu = () => {
  console.log("Menu");
  const apiUserInfo = useSelector(allInfoApi);
  const avatarUser = `${process.env.REACT_APP_STORAGE_VIDEO_BASE_URL}${apiUserInfo?.userInfo?.imgAvatarUrl}`

  return (
    <Container>
      <Test>
        <Wrapper>
          <InfoUser>
            <Logo>
              <Img src={avatarUser || avatarDefault} style={{ width: "100%", height: "100%",borderRadius:"900px" }} />
            </Logo>
            <Channel>Kênh của bạn</Channel>
            <Name>{apiUserInfo.userInfo.fullname}</Name>
          </InfoUser>
          <Scroll>

          <NavLink
              to="/"
              style={({ isActive }) =>
                isActive
                  ? {
                      backgroundColor: "#3360B3",
                      color:"white",
                      textDecoration: "none"
                    }
                  : undefined
              }
            >
              <Items>
                <HomeOutlinedIcon />
                  Trang chủ
              </Items>
          </NavLink>

          <NavLink
              to="/profile/channel"
              style={({ isActive }) =>
                isActive
                  ? {
                      backgroundColor: "#3360B3",
                      color:"white",
                      textDecoration: "none"
                    }
                  : undefined
              }
            >
              <Items>
                <HomeOutlinedIcon />
                 Kênh của bạn
              </Items>
            </NavLink>

            <NavLink
              to="/profile/edit"
              style={({ isActive }) =>
                isActive
                  ? {
                      backgroundColor: "#3360B3",
                      color:"white",
                      textDecoration: "none"
                    }
                  : undefined
              }
            >
              <Items>
                <HomeOutlinedIcon />
                Chỉnh sửa thông tin
              </Items>
            </NavLink>

            <NavLink
              to="/profile/upload"
              style={({ isActive }) =>
                isActive
                  ? {
                    backgroundColor: "#3360B3",
                    color:"white",
                    textDecoration: "none",
                    }
                  : undefined
              }
            >
          
              <Items>
                <ExploreOutlinedIcon />
                Trang tải video
              </Items>
            </NavLink>

            <NavLink
              to="/profile/playlist"
              style={({ isActive }) =>
                isActive
                  ? {
                    backgroundColor: "#3360B3",
                    color:"white",
                    textDecoration: "none",
                    }
                  : undefined
              }
            >
              <Items>
                <ShortTextIcon />
                Danh sách phát
              </Items>
            </NavLink>

            <Items>
              <SubscriptionsOutlinedIcon />
              Số liệu phân tích
            </Items>
            <Items>
              <VideoLibraryOutlinedIcon />
              Bình luận
            </Items>
            <Items>
              <HistoryIcon />
              Phụ đề
            </Items>
            <Items>
              <LibraryMusicTwoToneIcon />
              Bản quyền
            </Items>
            <Items>
              <EmojiEventsTwoToneIcon />
              Kiếm tiền
            </Items>
            <Items>
              <SportsEsportsTwoToneIcon />
              Tùy chỉnh
            </Items>
            <Items>
              <FeedTwoToneIcon />
              Thư viện âm thanh
            </Items>
          </Scroll>
        </Wrapper>
        <Final>
          <Items>
            <SettingsSuggestOutlinedIcon />
            Cài đặt
          </Items>
          <Items>
            <OutlinedFlagIcon />
            Gửi phản hồi
          </Items>
        </Final>
      </Test>
    </Container>
  );
};

export default Menu;
