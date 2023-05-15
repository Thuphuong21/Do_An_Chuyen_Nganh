import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { memo } from "react";
import { serverAPI } from "../../utils/axios";

const Container = styled.div`
  position: absolute;
  z-index: 99;
  width:max-content;
  bottom: 0;
  right:100%;
  background-color: ${({ theme }) => theme.bgLighter};
  transform: translate(25%, 50%);
  border:2px solid rgba(0.25,0.25,0.25,0.25);
`;
const Wrapper = styled.div``;

const Main = styled.div``;

const Items = styled.div`
  height: 40px;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  padding: 15px 20px;
  height: 40px;
  font-size: 15px;
  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;
const Item = styled.div``;

const ModalEditInfoVideo = (props) => {
  const test = useRef(null);
  const { 
    onBlur,
    data,
    setUpdateVideo,
    updateVideo,
    focusTitle,
    focusDes,
    setVideoOfOnlyUser,
    idCurrentUser
  } = props;
  
  const handleEditTitle = async(e) =>{
    e.stopPropagation()
    await setUpdateVideo({
      ...updateVideo, titleVideo:data?._id, diff:data?._id
    })  
    focusTitle?.current?.focus()
  }

  const handleEditDes = async(e) =>{
    e.stopPropagation()
    await setUpdateVideo({
      ...updateVideo, desVideo:data?._id, diff: data?._id
    })  
    focusDes?.current?.focus()
  }

  const handleDeleteVideo = () => {
    serverAPI.delete(`/videos/deleteVideo/${data?._id}`)
    .then(() =>{
      serverAPI.get(`/users/${idCurrentUser}`).then((res) => {
        setVideoOfOnlyUser(res.data);
      });
    })
  }

  useEffect(() => {
    test.current?.focus();
    test.current?.addEventListener("focusout", () => {
      onBlur();
    });
  });

  return (
    <Container ref={test} tabIndex="-1">
      <Wrapper>
        <Main>
          <Items onClick={handleEditTitle}>
            <Item>Tiêu đề</Item>
          </Items>
          <Items onClick={handleEditDes}>
            <Item>Miêu tả</Item>
          </Items>
          <Items  onClick={handleDeleteVideo}>
            <Item>Xóa video</Item>
          </Items>
        </Main>
      </Wrapper>
    </Container>
  );
};

export default memo(ModalEditInfoVideo);
