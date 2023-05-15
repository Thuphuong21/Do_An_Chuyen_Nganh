import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { allInfoApi } from "../../redux/selectors";
import { serverAPI } from "../../utils/axios";
import { Player, BigPlayButton } from "video-react";
import { toast, ToastContainer } from "react-toastify";
import { checkLogin } from "../../api/infoApi";

const Container = styled.div``;
const Wrapper = styled.div``;
const ChanelMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;
const Poster = styled.div`
  width: 100%;
  height: 250px;
  background-color: #f2f2f2;
`;
const ContentMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;
const ContentTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 100px;
`;
const ContentTopLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const Avatar = styled.div`
  width: 80px;
  height: 80px;
`;
const Name = styled.div``;

const Subscribe = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;
const ContentTopRight = styled.div``;
const Button = styled.div`
  cursor: pointer;
  background-color: #308d46;
  padding: 12px 15px;
  border-radius: 900px;
`;
const Img = styled.img``;

const InfoAdd = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Hr = styled.hr`
  border: 0.5px solid ${({ theme }) => theme.soft};
`;
const Navbar = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 100px;
  gap: 50px;
`;

const Items = styled.div`
  cursor: pointer;
`;
const VideoPlay = styled.div`
  padding: 0 100px;
`;

const Layout1 = styled.div`
  overflow-x: hidden;
`;

const Layout3 = styled.div`
  max-width: 100%;
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
`;

const Main = styled.div`
  max-width: 320px;
  min-width: 280px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Video = styled.div`
  width: 100%;
  height: 180px;
  background-color: transparent;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;
const Details = styled.div`
  display: flex;
  gap: 12px;
  margin: 5px 0;
  padding-bottom:20px;
`;

const AvatarImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 900px;
  background-color: #999;
`;
const Texts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;
const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;
const TitleVideo = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 20px;
  width: 200px;
  font-weight: 700;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 30px;
`;

const ChannelYou = () => {
  const apiUserInfo = useSelector(allInfoApi);
  console.log(apiUserInfo)

  const idCurrentUser = apiUserInfo?.userInfo?._id;
  const avatarUser = `${process.env.REACT_APP_STORAGE_VIDEO_BASE_URL}${apiUserInfo?.userInfo?.imgAvatarUrl}`;
  const imgCoverImageUrl = `${process.env.REACT_APP_STORAGE_VIDEO_BASE_URL}${apiUserInfo?.userInfo?.imgCoverImageUrl}`;
  const [videoOfOnlyUser, setVideoOfOnlyUser] = useState(null);
  const [countSub, setCountSub] = useState(null);
  // console.log(videoOfOnlyUser)
  const dispatch = useDispatch();
  const coverImage = useRef();

  const clickCoverImage = () => {
    coverImage.current.click();
  };
  
  const calcDate = (createdAt) => {
    return new Date(createdAt).toLocaleDateString();
  }
  
  const handleCoverImage = (e) => {
    const fileCoverImage = e.target.files[0];
    const formData = new FormData();
    formData.append("coverImage", fileCoverImage);

    const res = serverAPI({
      method: "patch",
      url: `/users/coverImg/${idCurrentUser}`,
      data: formData,
    });
    toast.promise(
      res,
      {
        pending: {
          render(data) {
            return "Xin vui lòng chờ xử lý";
          },
        },
        success: {
          render({ data }) {
            return "Cập nhật trang bìa thành công 👌";
          },
        },
        error: {
          render({ data }) {
            console.log(data);
            return data.response.data + "🤯";
          },
        },
      },
      {
        onClose() {
          res
            .then((res) => {
              dispatch(checkLogin());
            })
            .catch((errors) => {
              console.log(errors);
            });
        },
      }
    );
  };

  useEffect(() => {
    serverAPI.get(`/users/${idCurrentUser}`).then((res) => {
      setVideoOfOnlyUser(res.data);
    });

    serverAPI.get(`/users/getSubscribed`)
    .then((res) => {
      setCountSub(res.data);
    });

  }, [idCurrentUser]);

  return (
    <Container>
      <Wrapper>
        <ChanelMain>
          <Poster>
            <Img
              src={imgCoverImageUrl}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Poster>
          <ContentMain>
            <ContentTop>
              <ContentTopLeft>
                <Avatar>
                  <Img
                    src={avatarUser}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "900px",
                      objectFit: "cover",
                    }}
                  />
                </Avatar>
                <InfoAdd>
                  <Name>{apiUserInfo?.userInfo?.fullname}</Name>
                  <Subscribe>{countSub} Người đăng ký</Subscribe>
                </InfoAdd>
              </ContentTopLeft>
              <ContentTopRight>
                <Button type="button" onClick={clickCoverImage}>
                  Cập nhật ảnh bìa
                </Button>
                <input
                  type="file"
                  onChange={handleCoverImage}
                  ref={coverImage}
                  style={{ display: "none" }}
                />
              </ContentTopRight>
            </ContentTop>
            <Navbar>
              <Items>TRANG CHỦ</Items>
              <Items>VIDEO</Items>
              <Items>DANH SÁCH PHÁT</Items>
              <Items>CỘNG ĐỒNG</Items>
              <Items>KÊNH</Items>
              <Items>GIỚI THIỆU</Items>
            </Navbar>
          </ContentMain>
          <Hr />
          <VideoPlay>
            <Title>Danh Sách Đã Phát</Title>
            <Layout1>
              <Layout3>
                {videoOfOnlyUser ? (
                  videoOfOnlyUser.map((data) => {
                    return (
                      <div key={data._id}>
                        <Link
                          to={`/video/${data._id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <Main>
                            <Video>
                              <Player
                                className="videoThumb"
                                videoId="videoThumb"
                                poster={`${process.env.REACT_APP_STORAGE_VIDEO_BASE_URL}${data.imgUrl}`}
                              >
                                <BigPlayButton className="hiddenPlay" />
                                <source
                                  src={`${process.env.REACT_APP_STORAGE_VIDEO_BASE_URL}${data.videoUrl}`}
                                />
                              </Player>
                            </Video>
                            <Details>
                              <AvatarImage src={`${process.env.REACT_APP_STORAGE_VIDEO_BASE_URL}${data.user.imgAvatarUrl}`}/>
                              <Texts>
                                <TitleVideo>{data.titleVideo}</TitleVideo>
                                <ChannelName>{data.user.fullname}</ChannelName>
                                <Info>{data.views} Lượt xem • Ngày {calcDate(data.createdAt)} </Info>
                              </Texts>
                            </Details>
                          </Main>
                        </Link>
                      </div>
                    );
                  })
                ) : (
                  <></>
                )}
              </Layout3>
            </Layout1>
          </VideoPlay>
        </ChanelMain>
        <ToastContainer />
      </Wrapper>
    </Container>
  );
};

export default ChannelYou;
