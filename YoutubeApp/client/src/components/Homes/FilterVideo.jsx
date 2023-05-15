import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Player, BigPlayButton } from "video-react";
import avatarDefault from "../../assets/image/avatar.png";
import { serverAPI } from "../../utils/axios";

const Container = styled.div`
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div``;
const FilterMain = styled.div`
  padding: 30px;
`;

const TitleMain = styled.div``;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;
const Main = styled.div`
  display: flex;
  gap: 15px;
  align-items: flex-start;
  cursor: pointer;
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
`

const FilterVideo = () => {
  const { search } = useLocation();
  const [listVideoSearch, setListVideoSearch] = useState([]);

  useEffect(() => {
    // đầu tiên tách params ra rồi sau đó cho vào một đối tượng
    const params = Object.fromEntries(new URLSearchParams(search));
    serverAPI
      .get(`/videos/listSearch`, {
        params,
      })
      .then((res) => {
        setListVideoSearch(res.data);
      });
  }, [search]);

  const calcDate = (createdAt) => {
    return new Date(createdAt).toLocaleDateString();
  };

  const avatarUser = (avatar) => {
    return `${process.env.REACT_APP_STORAGE_VIDEO_BASE_URL}${avatar}`;
  };

  return (
    <Container>
      <Wrapper>
        <FilterMain>
          <TitleMain>Bộ lọc Video</TitleMain>
          <Hr />
          <AllVideo>
            {listVideoSearch.map((listSearch) => {
              return (
                <Link
                  to={`/video/${listSearch?._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Main key={listSearch?._id}>
                    <Video>
                      <Player
                        className="videoThumb"
                        videoId="videoThumb"
                        poster={`${process.env.REACT_APP_STORAGE_VIDEO_BASE_URL}${listSearch?.imgUrl}`}
                      >
                        <BigPlayButton className="hiddenPlay" />
                        <source
                          src={`${process.env.REACT_APP_STORAGE_VIDEO_BASE_URL}${listSearch?.videoUrl}`}
                        />
                      </Player>
                    </Video>
                    <Details>
                      <TitleVideo>{listSearch?.titleVideo}</TitleVideo>
                      <Info>
                        {listSearch?.views} Views • {calcDate(listSearch?.createdAt) || avatarDefault }{" "}
                      </Info>
                      <Texts>
                        <AvatarImage
                          src={avatarUser(listSearch?.user?.imgAvatarUrl)}
                        />
                        <ChannelName>{listSearch?.user?.fullname}</ChannelName>
                      </Texts>
                      <Des>{listSearch?.desc}</Des>

                    </Details>
                  </Main>
                </Link>
              );
            })}
          </AllVideo>
        </FilterMain>
      </Wrapper>
    </Container>
  );
};

export default FilterVideo;
