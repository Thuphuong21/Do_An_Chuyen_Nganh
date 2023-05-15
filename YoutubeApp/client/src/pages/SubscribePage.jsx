import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { serverAPI } from "../utils/axios";

const Container = styled.div`
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div``;
const SubscribeMain = styled.div`
  padding: 30px;
`;
const TitleMain = styled.div``;
const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const AllSubUser = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  flex-wrap: wrap;
`;

const UserMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  justify-content: center;
  width: 235px;
`;
const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 900px;
`;
const FullName = styled.div``;
const Des = styled.div`
  color: ${({ theme }) => theme.textSoft};
`;

const SubscribePage = () => {

  const [allUserSub, setAllUserSub] = useState([]);
  console.log(allUserSub);

  useEffect(() => {
    serverAPI.get(`/users/allChannelSub`).then((res) => {
      setAllUserSub(res.data);
    });
  }, []);

  return (
    <Container>
      <Wrapper>
        <SubscribeMain>
          <TitleMain>CÁC KÊNH MÀ BẠN ĐÃ ĐĂNG KÝ</TitleMain>
          <Hr />
          <AllSubUser>
            {allUserSub.map((sub) => {
              console.log(sub)
              return (
                <div key={sub?._id}>
                  <UserMain>
                    <Avatar src={process.env.REACT_APP_STORAGE_VIDEO_BASE_URL+sub.subscribeChannel?.imgAvatarUrl} />
                    <FullName>{sub.subscribeChannel.fullname}</FullName>
                    <Des>{sub.totalSubscribe} Người đăng ký</Des>
                  </UserMain>
                </div>
              );
            })}
          </AllSubUser>
        </SubscribeMain>
      </Wrapper>
    </Container>
  );
};

export default SubscribePage;
