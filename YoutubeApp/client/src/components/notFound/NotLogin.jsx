import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  color: ${({ theme }) => theme.text};
`;
const Wrapper = styled.div`
  height: 100%;
`;
const Main = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;
const Title = styled.div``;
const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 12px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: #065fd4;
  color: white;
`;

const NotLogin = () => {
  return (
    <Container>
      <Wrapper>
        <Main>
          <Title>
            Đăng nhập để xem cập nhật từ các kênh YouTube yêu thích của bạn
          </Title>
          <Link to="/signIn" style={{ textDecoration: "none" }}>
            <Button>ĐĂNG NHẬP</Button>
          </Link>
        </Main>
      </Wrapper>
    </Container>
  );
};

export default NotLogin;
