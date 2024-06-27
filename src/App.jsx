import React, { useEffect, useState } from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom';
import SideBar from './components/header/SideBar';
import ChatBox from './components/ChatBox';
import OpenChat from './components/OpenChat';
import { useAuth } from './context/contextApi';



const App = () => {
  const {chatId,chatOpen} = useAuth()
  
  const navigate = useNavigate()
  useEffect(()=>{
    const user = JSON.parse(sessionStorage.getItem('userData'))
    if( !user ){
      navigate('/register')
      
    }
    
    
  })
  return (
    <> 
      <div className=' lg:px-4  pb-0 bg-[#07110b]      overflow-hidden  h-screen     items-center justify-center  flex '>
        <div className="  lg:h-[96.5vh] h-full  relative    lg:flex-row flex-col flex w-full">
          <div className={`lg:h-full    absolute z-[2]  lg:static  bottom-0      w-full lg:w-[5%] ${chatOpen?"lg:block hidden":""} `}>
          <SideBar />
          </div>

          <div className="    flex flex-col lg:flex-row lg:w-full  ">
          <div className="  lg:w-1/3  lg:h-[93.5%]   lg:h-full     ">
            <Outlet />
          </div>
          <div className={` lg:rounded-r-lg  border-red-600 borde     h-full bg-[#1a1b1a]  lg:w-[67%]    ${chatOpen?"lg:block":"hidden lg:block "} `}>
            
            <OpenChat/>
          </div>
          </div>
          


        </div>

      </div>


    </>
  )
}

export default App
