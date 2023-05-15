import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { serverAPI } from "../../utils/axios";
import {
  Player,
  BigPlayButton,
} from "video-react";
import { Link } from "react-router-dom";

const Container = styled.div`
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 700;
`;
const Main = styled.div`
  display: flex;
  gap: 15px;
  align-items: flex-start;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;
const Video = styled.div`
  max-width: 400px;
  min-width: 400px;
  width: 400px;
  height: 225px;
  background-color: transparent;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;
const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 5px 0;
  flex: 1;
`;

const AvatarImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 900px;
  background-color: #999;
`;
const Texts = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
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
  width: 90%;
  max-height: 45px;
  font-weight: 700;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  text-transform: uppercase;
  font-size: 20px;
  display: block;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* số dòng hiển thị */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const AllVideo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Des = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 20px;
  width: 90%;
  font-weight: 700;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.textSoft};
`;
const History = () => {
  const [history, setHistory] = useState();
  console.log(history);

  const calcDate = (createdAt) => {
    return new Date(createdAt).toLocaleDateString();
  };

  const avatarUser = (avatar) => {
    return `${process.env.REACT_APP_STORAGE_VIDEO_BASE_URL}${avatar}`;
  };

  useEffect(() => {
    serverAPI.get(`/users/getHistoryVideo`).then((res) => {
      const reversed = (res.data).reverse();
      setHistory(reversed);
    });
  }, []);

  return (
    <Container className="History">
      <Wrapper>
        <Title>Nhật ký xem</Title>
        <Hr />
        <Main>
          <AllVideo>
            {history &&
              history.map((history) => {
                return (
                  <Link
                    to={`/video/${history.video._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Main key={history?._id}>
                      <Video>
                        <Player
                          className="videoThumb"
                          videoId="videoThumb"
                          poster={`${process.env.REACT_APP_STORAGE_VIDEO_BASE_URL}${history.video.imgUrl}`}
                        >
                          <BigPlayButton className="hiddenPlay" />
                          <source
                            src={`${process.env.REACT_APP_STORAGE_VIDEO_BASE_URL}${history.video.videoUrl}`}
                          />
                        </Player>
                      </Video>
                      <Details>
                        <TitleVideo>{history.video.titleVideo}</TitleVideo>
                        <Info>
                          {history.video.views} Views •{" "}
                          {calcDate(history.video.createdAt)}{" "}
                        </Info>
                        <Texts>
                          <AvatarImage
                            src={avatarUser(history?.userVideo?.imgAvatarUrl)}
                          />
                          <ChannelName>{history?.userVideo?.fullname}</ChannelName>
                        </Texts>
                        <Des>{history.video.desc}</Des>
                      </Details>
                    </Main>
                  </Link>
                );
              })}
          </AllVideo>
        </Main>
      </Wrapper>
    </Container>
  );
};

export default History;
