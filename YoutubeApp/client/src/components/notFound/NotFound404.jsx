import React from 'react'
import styled from 'styled-components'
import PageNotFound from "../../assets/image/pageNotFound.gif"

const NotFound = styled.div`
    display: flex;
    justify-content: center;
`
const notFound404 = () => {
  return (
    <NotFound>
        <img src={PageNotFound} alt="notFound"/>
    </NotFound>
  )
}

export default notFound404