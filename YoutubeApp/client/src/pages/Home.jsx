import React from 'react'
// import Card from '../components/Card'
import styled from 'styled-components'
import Menu from "../components/Homes/Menu"
import Navbar from "../components/Homes/Navbar"
import { Routes, Route } from "react-router-dom"; 
import SignIn from './SignIn'
import SignUp from './SignUp'
import Video from './Video'
import CardVideo from '../components/Homes/CardVideo.jsx'
import FilterVideo from '../components/Homes/FilterVideo';
import NotLogin from '../components/notFound/NotLogin';
import NotFound404 from '../components/notFound/NotFound404';
import History from '../components/Homes/History'
import SubscribePage from './SubscribePage';


const Container = styled.div`
    width:100%;
    height:100%;  
`

const Wrapper = styled.div`
  display: grid;
  grid-template-areas: 
  'header header header header header header'
  'menu mainView mainView mainView mainView mainView';
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr 6fr;
  height:100%;
`

const MainView = styled.div`
    grid-area: mainView;
    background-color: ${({ theme }) => theme.bg};
    overflow: hidden;
`

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height:100%;
`

const MainScroll = styled.div`
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 100%;

  ::-webkit-scrollbar {
    width:8px;
  }

  ::-webkit-scrollbar-track {
    background: transparent; 
  }
  ::-webkit-scrollbar-thumb {
    background: ${({theme}) => theme.bgScroll};
    border-radius:900px;
  }
`
const Home = () => {
  console.log("Home")  

  return (
  <div className="Home" style={{height:"100%",width:"100%"}}>
    <Container>
      <Wrapper>
        <Menu />
        <MainView>
          <MainWrapper>
            <MainScroll>
            <Navbar />
              <Routes>
                  <Route path="/" element= {<CardVideo />} />
                  <Route path="signIn" element={<SignIn />} />
                  <Route path="signUp" element={<SignUp />} />
                  <Route path="filterVideo" element={<FilterVideo />} /> 
                  <Route path="sub" element={<SubscribePage />} /> 
                  <Route path="history" element={<History />} />
                  <Route path="notLogin" element={<NotLogin />} /> 
                  <Route path="notLogin1" element={<NotLogin />} /> 
                  <Route path="notLogin2" element={<NotLogin />} /> 
                  <Route path="notLogin3" element={<NotLogin />} /> 
                  <Route path="notLogin4" element={<NotLogin />} /> 
                  <Route path="video">
                    <Route path=":id" element={<Video />} />
                  </Route>
                  <Route path="*" element={<NotFound404 />} />
              </Routes>
            </MainScroll>
          </MainWrapper>
        </MainView>
      </Wrapper>
    </Container>
  </div>
  )
}

export default Home