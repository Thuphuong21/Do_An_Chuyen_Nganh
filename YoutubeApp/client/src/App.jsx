import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { sendVideo } from "./api/videoSlice";
import { apiAllVideo } from "./redux/selectors";
import { AuthenUser } from "./routes/AuthenUser"

const ContentApp = styled.div`
  height: 100%;
  width: 100%;
  max-height: 100%;
`

function App() {
  const dispatch = useDispatch()
  const showAllVideo = useSelector(apiAllVideo)

  useEffect(() => {
    dispatch(sendVideo())
  },[dispatch])

  console.log("App")
  return (
      <div className="App" style={{height:"100%",width:"100%"}}>
        <ContentApp>
          {showAllVideo && <AuthenUser />}
          
        </ContentApp>
      </div>
  );
}

export default App;
