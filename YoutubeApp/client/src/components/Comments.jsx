import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { serverAPI } from "../utils/axios";
import avatarDefault from "../assets/image/avatar.png";
import { allInfoApi } from "../redux/selectors";
import { useSelector } from "react-redux";
import ModalComment from "../components/Homes/ModalComment";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.text};
  position: relative;
`;
const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 900px;
  align-self: flex-start;
`;
const StartComment = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
`;
const Button = styled.button`
  padding: 12px 15px;
  cursor: pointer;
  color: ${({ theme }) => theme.textSoft};
  background-color: ${({ theme }) => theme.bgLighter};
  border-radius: 900px;
  border: unset;

  &:hover {
    background-color: #512da7;
    color: #ffffff;
  }
`;
const Button1 = styled.div`
  padding: 12px 15px;
  cursor: pointer;
  color: ${({ theme }) => theme.textSoft};
  background-color: ${({ theme }) => theme.bgLighter};
  border-radius: 900px;
  border: unset;

  &:hover {
    background-color: #512da7;
    color: #ffffff;
  }
`
const Textarea = styled.textarea`
  resize: none;
  border: unset;
  outline: unset;
  background-color: transparent;
  overflow: hidden;
  color: inherit;
  width: 100%;
  padding-top: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
`;
const FailsReq = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  transform: translate(0%, 25%);
  color: #be4b49;
`;
const AllComment = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;

  & .iconComment {
    visibility: hidden;
  }

  &:hover .iconComment {
    color: ${({ theme }) => theme.text} !important;
    visibility: visible;
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text};
  flex: 1;
`;
const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;
const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;
const Text = styled.div`
  font-size: 14px;
  max-width: 600px;
  max-height: 45px;
  font-weight: 700;
  font-weight: 500;
  color: ${({ theme }) => theme.textSoft};
  display: -webkit-box;
  -webkit-line-clamp: 2; /* số dòng hiển thị */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const AllComments = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CommentsMain = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const Relative = styled.div`
  position: relative;
`;

const Comments = (props) => {
  console.log("comments");
  const { id, calcDate } = props;
  const apiUserInfo = useSelector(allInfoApi);
  const userInfo = apiUserInfo?.userInfo?._id;
  const avatarUser = `${process.env.REACT_APP_STORAGE_VIDEO_BASE_URL}${apiUserInfo?.userInfo?.imgAvatarUrl}`;
  const [showOptionComment, setShowOptionComment] = useState({});
  const [desc, setDesc] = useState({});
  const editComment = useRef({});

  const {
    register,
    handleSubmit,
    reset, 
    formState: { errors },
  } = useForm();
  const [comments, setComments] = useState([]);

  const handleComment = async (data) => {
    serverAPI
      .post(`/comments/${id}`, {
        comment: data.comment,
      })
      .then(() => {
        serverAPI.get(`/comments/${id}`).then((res) => {
          setComments(res.data);
        })
          .then(()=>{
              reset({ comment: "" })
          })
      });
  };

  const setOpenOptionComment = (data) => {
    setShowOptionComment(data._id);
  };

  const setCloseOptionComment = () => {
    setShowOptionComment(null);
  };

  const handleUpdateEdit = (data) => {
    const valueDes = editComment.current.value
    const idComment = data?._id
      serverAPI.patch(`/comments/${idComment}/editComment`,{
        comment: valueDes
      })
      .then((res) => {
        serverAPI.get(`/comments/${id}`).then((res) => {
          setComments(res.data);
        })
        .then( ()=>{
            setDesc({})
        })
      })
  };

  const handleCannelComment = () => {
    setDesc({})
  }

  useEffect(() => {
    serverAPI.get(`/comments/${id}`).then((res) => {
      setComments(res.data);
    });
  }, [id]);


  return (
    <Container>
      <StartComment onSubmit={handleSubmit(handleComment)}>
        <NewComment>
          <Avatar src={avatarUser || avatarDefault} />
          <Textarea
            placeholder="Viết bình luận"
            defaultValue=""
            {...register("comment", { required: true })}
          />
          {errors?.comment?.type === "required" && (
            <FailsReq>
              <PriorityHighIcon />
            </FailsReq>
          )}
        </NewComment>
        <Buttons>
          <Button 
            type="submit"
            // onClick={() => reset({ comment: "" })}
          >Bình luận</Button>
        </Buttons>
      </StartComment>
      <AllComments id="comment">
        {comments.map((comment) => {
          return (
            <AllComment key={comment?._id}>
              <Avatar
                src={
                  `${process.env.REACT_APP_STORAGE_VIDEO_BASE_URL}${comment?.user?.imgAvatarUrl}` ||
                  avatarDefault
                }
              />
              <CommentsMain>
                <Details>
                  <Name>
                    {comment?.user?.fullname}{" "}
                    <Date>{calcDate(comment?.createdAt)}</Date>
                  </Name>
                  {desc?._id === comment?._id ? (
                    <>
                      <Textarea
                        ref={editComment}
                        defaultValue={comment?.desc}
                      />
                      <div
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <Buttons>
                          <Button1 onClick={handleCannelComment}>Hủy</Button1>
                          <Button1 onClick={()=>{handleUpdateEdit(comment)}}>Cập nhật</Button1>
                        </Buttons>
                      </div>
                    </>
                  ) : (
                    <Text>{comment?.desc}</Text>
                  )}
                </Details>
              </CommentsMain>
              <Relative>
                <MoreHorizOutlinedIcon
                  className="iconComment"
                  style={{ color: "inherit", cursor: "pointer" }}
                  onClick={() => {
                    setOpenOptionComment(comment);
                  }}
                />
                {showOptionComment === comment._id ? (
                  <ModalComment
                    onBlur={setCloseOptionComment}
                    userInfo={userInfo}
                    comment={comment}
                    setComments={setComments}
                    id={id}
                    setDesc={setDesc}
                  />
                ) : (
                  ""
                )}
              </Relative>
            </AllComment>
          );
        })}
      </AllComments>
    </Container>
  );
};

export default Comments;
