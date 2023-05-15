import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { serverAPI } from "../../utils/axios";

const OpenModal = styled.div`
  position: absolute;
  top: 0;
  right: 100%;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  width: max-content;
  border-radius: 10px;
`;
const Change = styled.div`
  cursor: pointer;
  padding: 12px 15px;

  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

const ModalComment = (props) => {
  const test = useRef(null);
  const { onBlur, userInfo, comment, setComments, id, setDesc } = props;

  const handleDeleteComment = () => {
    serverAPI.get(`/comments/${comment?._id}/deleteComment`).then(() => {
      serverAPI.get(`/comments/${id}`).then((res) => {
        setComments(res.data);
      });
    });
  };

  const handleEditComment = async() => {
    setDesc(comment);
  };

  useEffect(() => {
    test.current?.focus();
    test.current?.addEventListener("focusout", () => {
      onBlur();
    });
  });

  return (
    <div ref={test} tabIndex="-1">
      {userInfo === comment?.user?._id ? (
        <OpenModal>
          <Change onClick={handleEditComment}>Chỉnh sửa</Change>
          <Change onClick={handleDeleteComment}>Xóa</Change>
        </OpenModal>
      ) : (
        <OpenModal>
          <Change>Báo cáo vi phạm</Change>
        </OpenModal>
      )}
    </div>
  );
};

export default ModalComment