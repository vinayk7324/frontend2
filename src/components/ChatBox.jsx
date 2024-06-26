import React from 'react'
import {Button} from 'flowbite-react'
import bannerImg from '../assets/Chatbanner.png'

const ChatBox = () => {
  return (
    <div className=' text-white h-full flex items-center w-full   justify-center'>
      <div className=" flex flex-col items-center space-y-3">
        <div className="">
          <img src={bannerImg} className=' h-36' alt="" />
        </div>
        <div className=" flex-col flex space-y-6 items-center justify-center">
          <span className=' text-5xl'>Download QuickChat For Windows</span>
          <span className=' text-[23px]'>Make calls, share your screen and get a faster experience when you download the Windows app.</span>
          <Button>Get from  Microsoft Store</Button>
        </div>

      </div>
      
    
    </div>
  )
}

export default ChatBox
