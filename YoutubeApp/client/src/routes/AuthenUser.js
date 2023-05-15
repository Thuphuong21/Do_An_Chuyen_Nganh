import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from "react-router-dom"
import Home from '../pages/Home'
import Profile from '../pages/Profile'
import { allInfoApi, disableEventAllSelector, interfaceModeSelector } from '../redux/selectors'

import { checkLogin } from "../api/infoApi"

import { disableAllEvent } from '../utils/disableAllEvent'
import { ThemeProvider } from 'styled-components'
import { darkTheme, lightTheme } from '../utils/themes'

export const AuthenUser = () => {
    console.log("AuthenUser")
    const dispatch = useDispatch()
    
    const disableSelector = useSelector(disableEventAllSelector) 
    const modeSelector = useSelector(interfaceModeSelector)

    useEffect (() =>{
        const disableEvent = (event) => {
          disableAllEvent(event,dispatch,disableSelector)
        }
        window.addEventListener("click", disableEvent) 
        return () => { 
          window.removeEventListener("click", disableEvent) 
        }  
      },[dispatch,disableSelector],)

    const apiUser = useSelector(allInfoApi)

    useEffect(() => {
        dispatch(checkLogin())
    },[dispatch])


    return (
        <>
            <ThemeProvider theme={modeSelector.modeDark.feature ? darkTheme : lightTheme}>
                <Routes>
                    <Route path="/*" element={<Home />} />
                    {apiUser && 
                        <Route path="/profile/*" element={<Profile />} />
                    }
                </Routes> 
            </ThemeProvider>
        </>
    )
}

