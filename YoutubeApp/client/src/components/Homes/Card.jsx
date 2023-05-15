import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom"
import { Player, BigPlayButton } from "video-react"
import avatarDefault from "../../assets/image/avatar.png"

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
`;

const AvatarImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 900px;
  background-color: #999;
`
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
`

const Card = (props) => {
  const {everyVideo,idVideo,calcDate} = props
  const avatarUser =  `${process.env.REACT_APP_STORAGE_VIDEO_BASE_URL}${everyVideo?.user?.imgAvatarUrl}`

  return (
    <Link to={`/video/${idVideo}`} style={{ textDecoration: "none" }}>
      <Main>
        <Video>
          <Player
            className="videoThumb"
            videoId="videoThumb"
            poster={`${process.env.REACT_APP_STORAGE_VIDEO_BASE_URL}${everyVideo.imgUrl}`}
          >
            <BigPlayButton className="hiddenPlay" />
            <source
              src={`${process.env.REACT_APP_STORAGE_VIDEO_BASE_URL}${everyVideo.videoUrl}`}
            />
          </Player>
        </Video>
        <Details>
          <AvatarImage src={avatarUser || avatarDefault}/>
          <Texts>
            <TitleVideo>{everyVideo.titleVideo}</TitleVideo>
            <ChannelName>{everyVideo.user.fullname}</ChannelName>
            <Info>{everyVideo.views} Views • {calcDate(everyVideo?.createdAt)} </Info>
          </Texts>
        </Details>
      </Main>
    </Link>
  );
};

export default Card;
