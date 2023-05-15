import React, { useRef } from "react";
import styled from "styled-components";
import Comments from "../components/Comments";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ShareIcon from "@mui/icons-material/Share";
import { useSelector } from "react-redux";
import { apiAllVideo } from "../redux/selectors";
import { serverAPI } from "../utils/axios";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";

import {
  Player,
  ControlBar,
  BigPlayButton,
  PlayToggle,
  ReplayControl,
  ForwardControl,
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,
  VolumeMenuButton,
} from "video-react";
import { useState } from "react";

const Container = styled.div``;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const VideoWrapper = styled.div`
  width: 100%;
  height: 550px;
`;
const Title = styled.h1`
  display: -webkit-box;
  max-height: 70px;
  text-overflow: ellipsis;
  white-space: normal;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 18px;
  font-weight: 400;
  color: ${({ theme }) => theme.text};
  max-width: 800px;
  line-height: 2rem;
`;
const DetailsRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const InfoRight = styled.span`
  color: ${({ theme }) => theme.textSoft};
  font-size: 14px;
  display: -webkit-box;
  max-height: 20px;
  text-overflow: ellipsis;
  white-space: normal;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;
const Buttons = styled.div`
  display: flex;
  gap: 15px;
  color: ${({ theme }) => theme.text};
  background-color: ${({theme}) => theme.bgLighter};
  padding: 12px 15px;
  border-radius: 900px;
  
`
const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`
const Hr = styled.hr`
  margin: 10px 0;
  border: 0.5px solid ${({ theme }) => theme.soft};
`
const Recommendation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`
const Channel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
`
const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
  gap: 10px;
`;
const ChannelName = styled.span`
  font-weight: 500;
  color:${({theme}) => theme.textSoft};
`;
const ChannelCounter = styled.span`
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;
const Description = styled.p`
  display: -webkit-box;
  max-height: 50px;
  text-overflow: ellipsis;
  white-space: normal;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 14px;
  color: ${({ theme }) => theme.text};
  max-width: 400px;
`;
const Subscribe = styled.button`
  background-color: transparent;
  border: none;
`;
const MaxContent = styled.div`
  padding: 10px 20px;
  background-color: #512da7;
  font-weight: 550;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  border-radius: 900px;

`
const Sub = styled.div`
  padding: 10px 20px;
  background-color: #cc1a00;
  font-weight: 550;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  border-radius: 900px;
`
const ContentMain = styled.div`
  display: flex;
  padding: 0 30px;
  justify-content: space-between;
  padding-bottom: 30px;
  width:100%;
  gap:30px;
`;
const ContentLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  flex:7;
`;
const ContentRight = styled.div`
  flex:3;
`;

const MainRight = styled.div`
  cursor: pointer;
  display: flex;
  gap: 10px;
`;
const VideoSmall = styled.div`
  max-width: 400px;
  min-width: 280px;
  cursor: pointer;
  display: flex;
  gap: 10px;
`;

const VideoRight = styled.div`
  background-color: transparent;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  flex: auto;
  position: relative;
`;
const Details = styled.div`
  display: flex;
  gap: 12px;
  flex: 1;
`;
const Texts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin:5px 0; 

`;
const ChannelNameRight = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  
`;
const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;
const TitleVideo = styled.div`
  display: -webkit-box;
  max-height: 38px;
  text-overflow: ellipsis;
  white-space: normal;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 20px;
  font-weight: 700;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  
`
const AvatarImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 900px;
  background-color: #999;
`
const FakeVideo = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index:999;
`

const Video = () => {
  console.log("video")
  const [current, setCurrent] = useState({})
  const avatarUser = `${process.env.REACT_APP_STORAGE_VIDEO_BASE_URL}${current?.user?.imgAvatarUrl}`
  const player = useRef(null)
  const { id } = useParams()
  const videos = useSelector(apiAllVideo)

  const calcDate = (createdAt) => {
    return new Date(createdAt).toLocaleDateString();
  }
  
  const handleLike = () => {
    serverAPI.patch(`/users/like/${id}`)
    .then(() => {
        serverAPI.get(`/users/${id}/status`)
          .then((res) =>{
            setCurrent({
              ...current,
              reactions: {
                ...current.reactions,
                ...res.data
              }
            })
          })
    })
  }
  
  const handleDislike = () => {
    serverAPI.patch(`/users/dislike/${id}`)
    .then(() => {
      serverAPI.get(`/users/${id}/status`)
        .then((res) =>{
          setCurrent({
            ...current,
            reactions: {
              ...current.reactions,
              ...res.data
            }
          })
        })
    })
  }
  
  const handleSubscribe = () => {
    serverAPI.patch(`/users/subscribe/${id}`)
    .then(() => {
      serverAPI.get(`/users/${id}/status`)
      .then((res) =>{
        setCurrent({
          ...current,
          reactions: {
            ...current.reactions,
            ...res.data
          }
        })
      })
    })
  }

  useEffect(() => {
    serverAPI.get(`/videos/${id}`)
    .then((resVideo) => {
      setCurrent(resVideo.data)
      player.current.video.load(resVideo.data.videoUrl)
      
      serverAPI.get(`/users/${id}/status`)
      .then((resIsLiked) => {
          setCurrent({
            ...resVideo.data,
            reactions: {
              ...resVideo.data.reactions,
              ...resIsLiked.data
            }
          })
          serverAPI.put(`/videos/view/${id}`)
      })
      serverAPI.get(`/users/historyWatched/${id}`)
    })
  }, [id])

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <Player
            autoPlay
            className="videoThumbMain"
            videoId="playVideoMain"
            ref={player}
          >
            <BigPlayButton position="center" />
            <source
              src={`${process.env.REACT_APP_STORAGE_VIDEO_BASE_URL}${current?.videoUrl}`}
            />
            <ControlBar>
              <PlayToggle />
              <ReplayControl seconds={10} order={1.1} />
              <ForwardControl seconds={30} order={1.2} />
              <CurrentTimeDisplay order={4.1} />
              <TimeDivider order={4.2} />
              <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
              <VolumeMenuButton />
            </ControlBar>
          </Player>
        </VideoWrapper>

        <ContentMain>
          <ContentLeft>
            <Title>{current?.titleVideo}</Title>
            <Hr />
            <Channel>
              <ChannelInfo>
                <AvatarImage src={avatarUser}/>
                <ChannelDetail>
                  <ChannelNameRight>
                    {current?.user?.fullname || "Người dùng không có"}
                  </ChannelNameRight>
                  <ChannelCounter>{current.reactions?.subscribe} Người đăng ký</ChannelCounter>
                  <Description>{current?.desc}</Description>
                </ChannelDetail>
              </ChannelInfo>
              <Subscribe onClick={handleSubscribe}>
                {current?.reactions?.Subscribed 
                ? 
                  <>
                      <MaxContent>Đã Đăng Ký</MaxContent>
                  </>
                : 
                  <>
                      <Sub>ĐĂNG KÝ</Sub>
                  </>
                } 
              </Subscribe>
            </Channel>
            <DetailsRight style={{ marginTop: "20px" }}>
              <Info>{current?.views} Lượt xem • {calcDate(current.createdAt)}</Info>
              <div
                style={{display:"flex",alignItems:"center",gap:"15px"}}>
              <Buttons>
                <Button onClick={handleLike} >
                    {(current?.reactions?.Liked) 
                    ? 
                      <>
                          <ThumbUpOffAltIcon style={{color:"#512da7"}}/>
                          <div style={{color:"#512da7"}}>{current?.reactions?.like}</div>
                      </>
                    : 
                      <>
                         <ThumbUpOffAltIcon />
                         <div>{current?.reactions?.like}</div>
                      </>
                    }
                </Button>
                <Button onClick={handleDislike}>
                  {(current?.reactions?.DisLiked) 
                    ? 
                      <>
                          <ThumbDownOffAltIcon style={{color:"#512da7"}}/>
                          <div style={{color:"#512da7"}}>{current?.reactions?.dislike}</div>
                      </>
                    : 
                      <>
                        <ThumbDownOffAltIcon />
                        <div>{current?.reactions?.dislike}</div>
                      </>
                    }
                </Button>
              </Buttons>
              <Buttons>
                <Button>
                  <ShareIcon /><div>Chia sẽ</div>
                </Button>
              </Buttons>
              </div>
            </DetailsRight>
            <Hr />
            <Comments current={current} id={id} calcDate={calcDate}/>
          </ContentLeft>
          <ContentRight>
            <Recommendation>
              {videos.map((data) => {
                return (
                  <div key={data._id}>
                    <MainRight>
                      <Link
                        to={`/video/${data._id}`}
                        style={{ textDecoration: "none",width:"100%",height:"100%"}}
                      >
                        <VideoSmall>
                          <VideoRight>
                            <Player
                              className="videoThumb"
                              videoId="videoThumb"
                              poster={`${process.env.REACT_APP_STORAGE_VIDEO_BASE_URL}${data.imgUrl}`}
                              muted={true}
                            >
                              <BigPlayButton className="hiddenPlay" />

                              <ControlBar autoHide={true} disableDefaultControls={false}>
                                <VolumeMenuButton disabled />
                              </ControlBar>

                              <source src={`${process.env.REACT_APP_STORAGE_VIDEO_BASE_URL}${data.videoUrl}`} />
                            </Player>
                            
                          <FakeVideo></FakeVideo>
                          </VideoRight>
                          <Details>
                            <Texts>
                              <TitleVideo>{data.titleVideo}</TitleVideo>
                              <ChannelName>{data.user.fullname}</ChannelName>
                              <InfoRight>
                                {data.views} views • {calcDate(data.createdAt)}{" "}
                              </InfoRight>
                            </Texts>
                          </Details>
                        </VideoSmall>
                      </Link>
                    </MainRight>
                  </div>
                );
              })}
            </Recommendation>
          </ContentRight>
        </ContentMain>
      </Content>
    </Container>
  );
};

export default Video;
