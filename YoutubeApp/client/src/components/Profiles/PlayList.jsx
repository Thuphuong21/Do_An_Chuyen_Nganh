import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { Player, ControlBar, BigPlayButton } from "video-react";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import ModalEditInfoVideo from "./ModalEditInfoVideo";
import { useSelector } from "react-redux";
import { allInfoApi } from "../../redux/selectors";
import { serverAPI } from "../../utils/axios";

const Container = styled.div`
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.textSoft};
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  height: 100%;
`;
const Wrapper = styled.div`
  width: 100%;
`;
const ListMain = styled.div``;

const Intro = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 30px 20px 0;
`;
const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
`;

const Hr = styled.hr`
  margin: 20px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const TextSmall = styled.div`
  cursor: pointer;
  border-bottom: 2px solid transparent;
  color: ${({ theme }) => theme.textSoft};
`;
const Navbar = styled.div`
  position: relative;
  display: flex;
  padding: 0 20px;
  align-items: center;
  gap: 10px;
`;
const Items = styled.div`
  flex: 1;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  align-self: stretch;
`;

const ShowVideo = styled.div`
  flex: 1;
`;
const EditListPlay = styled.div`
  display: flex;
  flex-direction: column;
`;

const Textarea = styled.textarea`
  resize: none;
  border: unset;
  outline: unset;
  background-color: transparent;
  overflow: hidden;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.bgLighter};
  border: 2px solid #f2f2f2;
  width: 100%;
  height: 100%;
`;
const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 12px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: #36a420;
  color: #f2f2f2;
  font-weight: 650;
  width: max-content;
`;
const PlayList = () => {
  console.log("playlist");
  const apiUserInfo = useSelector(allInfoApi);
  const idCurrentUser = apiUserInfo?.userInfo?._id;
  const [videoOfOnlyUser, setVideoOfOnlyUser] = useState(null);
  const [updateVideo, setUpdateVideo] = useState({
    idVideo: null,
    titleVideo: null,
    desVideo: null,
    diff: null,
  });
  console.log(updateVideo);
  debugger;
  const focusTitle = useRef(null);
  const focusDes = useRef(null);

  const calcDate = (createdAt) => {
    return new Date(createdAt).toLocaleDateString();
  };

  const handleEditVideo = (data, e) => {
    setUpdateVideo({
      ...updateVideo,
      idVideo: data?._id,
    });
  };

  const setCloseEditVideo = () => {
    setUpdateVideo({
      ...updateVideo,
      idVideo: null,
    });
  };

  const handleUpdateAll = async (data) => {
    await serverAPI
      .patch(`/videos/updateInfoVideo/${data?._id}`, {
        titleVideo: focusTitle?.current?.value,
        des: focusDes?.current?.value,
      })
      .then(async () => {
        await setUpdateVideo({
          ...updateVideo,
          titleVideo: null,
          desVideo: null,
          diff: null,
        });
        serverAPI.get(`/users/${idCurrentUser}`).then((res) => {
          setVideoOfOnlyUser(res.data);
        });
      });
  };

  const handleCannelUpdate = async () => {
    setUpdateVideo({
      ...updateVideo,
      titleVideo: null,
      desVideo: null,
      diff: null,
    });
  };

  useEffect(() => {
    serverAPI.get(`/users/${idCurrentUser}`).then((res) => {
      setVideoOfOnlyUser(res.data);
    });
  }, [idCurrentUser]);

  return (
    <Container>
      <Wrapper>
        <ListMain>
          <Intro>
            <Title>Nội dung của kênh</Title>
            <div style={{ display: "flex", gap: "20px" }}>
              <TextSmall>Video</TextSmall>
              <TextSmall>Trực tiếp</TextSmall>
            </div>
          </Intro>
          <Hr />
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              padding: "0 20px",
            }}
          >
            <FilterAltOutlinedIcon style={{ cursor: "pointer" }} />
            <TextSmall>Thống kê video của bạn</TextSmall>
          </div>
          <Hr />
          <Navbar>
            <Items>Video</Items>
            <Items>Title</Items>
            <Items>Miêu tả</Items>
            <Items>Ngày</Items>
            <Items>Số lượt xem</Items>
            <Items>Số lượt thích</Items>
            <Items>Chỉnh sửa</Items>
          </Navbar>
          <Hr />
          <EditListPlay>
            {videoOfOnlyUser &&
              videoOfOnlyUser.map((data) => {
                return (
                  <div key={data?._id}>
                    <Navbar>
                      <ShowVideo style={{ alignSelf: "stretch" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            flex: "1",
                            height: "100%",
                            width: "100%",
                          }}
                        >
                          <div style={{ height: "124px", width: "200px" }}>
                            <Player
                              className="videoThumb"
                              videoId="videoThumb"
                              poster={`${process.env.REACT_APP_STORAGE_VIDEO_BASE_URL}${data.imgUrl}`}
                            >
                              <BigPlayButton className="hiddenPlay" />
                              <ControlBar
                                autoHide={true}
                                disableDefaultControls={false}
                              ></ControlBar>
                              <source
                                src={`${process.env.REACT_APP_STORAGE_VIDEO_BASE_URL}${data.videoUrl}`}
                              />
                            </Player>
                          </div>
                        </div>
                      </ShowVideo>

                      {updateVideo.titleVideo === data?._id &&
                      updateVideo.diff === data?._id ? (
                        <Items>
                          <Textarea
                            defaultValue={data?.titleVideo}
                            ref={focusTitle}
                          />
                        </Items>
                      ) : (
                        <Items style={{ fontSize: "14px" }}>
                          {data?.titleVideo}
                        </Items>
                      )}

                      {updateVideo.desVideo === data?._id &&
                      updateVideo.diff === data?._id ? (
                        <Items>
                          <Textarea defaultValue={data?.desc} ref={focusDes} />
                        </Items>
                      ) : (
                        <Items style={{ fontSize: "14px" }}>{data?.desc}</Items>
                      )}

                      <Items>{calcDate(data.createdAt)}</Items>
                      <Items>Số lượt xem</Items>
                      <Items>{data?.countLike}</Items>
                      <div style={{ position: "relative" }}>
                        {updateVideo?.idVideo === data?._id && (
                          <ModalEditInfoVideo
                            onBlur={setCloseEditVideo}
                            data={data}
                            setUpdateVideo={setUpdateVideo}
                            updateVideo={updateVideo}
                            focusTitle={focusTitle}
                            focusDes={focusDes}
                            setVideoOfOnlyUser={setVideoOfOnlyUser}
                            idCurrentUser={idCurrentUser}
                          />
                        )}
                      </div>
                      <Items>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            alignItems: "center",
                          }}
                        >
                          <div
                            onClick={() => handleEditVideo(data)}
                            style={{
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            Chỉnh sửa <ArrowDropDownOutlinedIcon />
                          </div>
                          {(updateVideo?.titleVideo === data?._id ||
                            updateVideo?.desVideo === data?._id) && (
                            <>
                              <Button
                                onClick={() => {
                                  handleUpdateAll(data);
                                }}
                              >
                                Cập nhật
                              </Button>
                              <Button
                                style={{ backgroundColor: "#E3586C" }}
                                onClick={handleCannelUpdate}
                              >
                                Hủy
                              </Button>
                            </>
                          )}
                        </div>
                      </Items>
                    </Navbar>
                    <Hr />
                  </div>
                );
              })}
          </EditListPlay>
        </ListMain>
      </Wrapper>
    </Container>
  );
};

export default PlayList;
