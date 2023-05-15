import React,{memo, useCallback} from 'react'
import styled from 'styled-components'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckIcon from '@mui/icons-material/Check';
import { useDispatch, useSelector} from 'react-redux';
import { interfaceModeSelector } from '../redux/selectors';
import { InterfaceSlice } from './modalSlice';

const Container = styled.div`
 position: absolute;
  right:100%;
  top:100%;
  width:max-content;
  height:max-content;
  background-color:${({theme}) => theme.bgLighter};
  z-index:999;
  border-radius:10px;
  border:1px solid rgba(0,0,0, 0.25);
  margin:10px;
  cursor: context-menu;
  box-shadow: 0 0 20px rgba(0,0,0, 0.25);
`
const Wrapper = styled.div`
  padding: 10px 0;
`
const Hr = styled.hr`
  margin: 10px 0px;
  border: 0.5px solid ${({theme}) => theme.soft};
`
const Items = styled.div`
  display: flex;
  justify-content: space-between ;
  align-items: center;
  cursor: pointer;
  padding: 0px 20px;
  height:40px;
  font-size:15px;
  color:${({theme}) => theme.text};
  
  &:hover{
    background-color: ${({theme}) => theme.soft};
    background-color: ${(props) => props.type === "hiddenHover" && "transparent"};
  }
`
const Item = styled.div`
  display:flex;
  align-items: center;
  gap:20px;
`
const Note = styled.div`
  font-size:12px;
  cursor: text;
  padding-left:20px;
  margin:10px 0;
  max-width: 90%;
`
const Option = styled.div ` `
const Visibility = styled.div`
  visibility: ${(props) => props.showIcon === props.feature ? "visible" : "hidden"};

` 

const InterfaceMode = ({show,setShow}) => {
  console.log("InterfaceMode")
  const dispatch = useDispatch()
  const modeSelector = useSelector(interfaceModeSelector);

  const handleBack = (e) => {
    e.stopPropagation()
    setShow({
      showMode: !(show.showMode),
    })
  }
  
  const handleModeBright = useCallback((e) => {
    e.stopPropagation()
    
    if(modeSelector["modeCurrent"] !== "modeLight") {
      dispatch(
        InterfaceSlice.actions.Mode({modeCurrent:"modeLight"})
      )
    }  
  },[modeSelector,dispatch])

  const handleModeDark = useCallback((e) => {
    e.stopPropagation()
    if(modeSelector["modeCurrent"] !== "modeDark"){
      dispatch(
        InterfaceSlice.actions.Mode({modeCurrent:"modeDark"})
      )
    }
  },[modeSelector,dispatch])

  return (
    <Container>
      <Wrapper>
          <Items type="hiddenHover" onClick={handleBack}>
            <Item><ArrowBackIcon/>Giao diện</Item>
          </Items>
          <Hr />
          <Note>Tùy chọn cài đặt chỉ áp dụng cho trình duyệt này</Note>
          <Option>
            <Items onClick={handleModeBright}>       
              {/*Lưu ý () trong này trả về một chuỗi jsx  */}
              {/*Lưu ý {} trả về một function nhưng trong function đó có jsx thì thay đổi {} => () khỏi return  */}
              <Item>
                <Visibility showIcon={true} feature={modeSelector.modeLight.feature}><CheckIcon /></Visibility>
                  Giao diện sáng
              </Item>
            </Items>
            <Items onClick={handleModeDark}>
              <Item>
                <Visibility showIcon ={true} feature={modeSelector.modeDark.feature} ><CheckIcon/></Visibility>
                  Giao diện tối
              </Item>
            </Items>
          </Option>
        </Wrapper>
    </Container>
  )
}

export default memo(InterfaceMode)
