import React from "react"
import styled from "styled-components"
import { memo } from "react"
import Card from "./Card"
import { apiAllVideo } from "../../redux/selectors"
import { useSelector } from "react-redux"

const Container = styled.div`
`

const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const CardMain = styled.div`
  max-width: 100%;
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;


const CardVideo = () => {
  const videos = useSelector(apiAllVideo)

  const calcDate = (createdAt) => {
    return new Date(createdAt).toLocaleDateString();
  };
  
  return (
    <Container>
      <Wrapper>
        <CardMain >
          {videos.map((data) => {
            return (
              <div key={data._id}>
                  <Card everyVideo={data} idVideo={data._id} calcDate={calcDate} />
              </div>
            );
          })}
        </CardMain>
      </Wrapper>
    </Container>
  );
};

export default memo(CardVideo)
