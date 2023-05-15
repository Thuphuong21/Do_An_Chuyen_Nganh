import styled from 'styled-components'
import { Route, Routes } from 'react-router-dom'
import Menu from "../components/Profiles/Menu"
import Navbar from "../components/Profiles/Navbar"
import EditProfile from "../components/Profiles/EditProfile"
import UploadVideo from '../components/Profiles/UploadVideo'
import PlayList from '../components/Profiles/PlayList'
import ChannelYou from '../components/Profiles/ChannelYou'

const Container = styled.div`
    width:100%;
    height:100%;  
`

const Wrapper = styled.div`
  display: grid;
  grid-template-areas: 
  'header header'
  'menu mainView';
  grid-template-rows: auto 1fr;
  grid-template-columns: auto 1fr;
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
const Profile = () => {
  return (
    <div className="Profile" style={{height:"100%"}}>
   <Container>
      <Wrapper>
        <Navbar />
        <Menu />
        <MainView>
          <MainWrapper>
            <MainScroll>
                <Routes>
                  <Route path="/edit" element={<EditProfile />} />
                  <Route path="/upload" element={<UploadVideo />} />
                  <Route path="/playlist" element={<PlayList />} />
                  <Route index path="/channel" element={<ChannelYou />} />
              </Routes>
            </MainScroll>
          </MainWrapper>
        </MainView>
      </Wrapper>
    </Container>
    </div>
  )
}

export default Profile