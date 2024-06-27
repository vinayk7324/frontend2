import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {v4 as id }from 'uuid'
import img from '../assets/meetme.png'
import { TextInput } from 'flowbite-react';
import { HiSearch } from 'react-icons/hi';
function Setting() {
  const [user,setUser] = useState('');

  const settingArr =  [ 
    {
      to:'',
      icon:'vpn_key',
      title:'Account',
      description:"Security notifications,change number"

    },
    {
      to:'',
      icon:'lock',
      title:'Privacy',
      description:"Block list,disappearing message"


    },
   
    {
      to:'',
      icon:'message',
      title:'Chats',
      description:"Theme,Wallpapers,chat history"

    },
    {
      to:'',
      icon:'Notifications',
      title:'Notifications',
      description:'Message,group & call tones'

    },
    {
      to:'',
      icon:'language',
      title:'App language',
      description:"English(device's language)"

    },
    {
      to:'',
      icon:'help',
      title:'Help',
      description:"Help center,contact us,privacy policy"

    },
    {
      to:'',
      icon:'group',
      title:'Invite a friend',
      


    },
   
  ]
  
useEffect(()=>{
  const user  =  sessionStorage.getItem('userData');
  if(user){
    const parseUser = JSON.parse(user).userDetails
    setUser(parseUser)

  }
},[])

  return (
    <div className=' '>

      <div className=" lg:space-y-6  ">
      <div className=" px-4 py-3 flex  lg:flex-col lg:space-y-4 lg:items-start items-center justify-between">
      <div className="  text-[25px] lg:text-3xl text-white font-bold ">
          Settings
        </div>
        <div className="px-6  w-full">
        <div className=" lg:block hidden  w-full border    rounded-xl bg-[#0d110e] ">
         
          <div className=' text-white flex items-center border space-x-3 px-2 rounded-xl py-1'>
            <span className=' text-[28px]'>
              <HiSearch className='  ' />
            </span>
            <input placeholder=' search settings ' type="text" className='   focus:outline-[4px] border-none  bg-inherit ' />
          
          </div>
       
        </div>
        </div>
        <span className="material-symbols-outlined text-white lg:hidden block">
            search
          </span>

      </div>


     <div className=" overflow-y-scroll  h-[80vh] ">
     <div className=" text-white flex space-x-3 lg:px-6 px-4 border-2 border-[#1f1f1f] items-center hover:bg-[#48474751] lg:py-2 py-4">
          <div className=" border lg:h-16 lg:w-16 h-12 w-12 rounded-full flex items-center justify-center "> 
            <img src={`data:image/svg+xml;base64,${user.avatarImage}`} alt="" />
          </div>
          <div className="  lg:space-y-2 flex flex-col items-start">
            <span className=' lg:text-[20px] text-[18px] first-letter:uppercase '> {user.name} </span>
            <span className=' text-[14px] lg:text-[16px]' >IITian</span>
          </div>
        </div>

     
      <div className="  ">
        {
          settingArr.map((element)=>(
            <div key={id()} className=" flex    items-center py-2 lg:px-6 px-4 space-x-3 space-y-4 border-b-2 border-[#202020]  hover:bg-[#48474751] ">

          <div className="  text-white lg:w-12 lg:h-12 flex items-center justify-center rounded-full">
            <span className='material-symbols-outlined  '>{element.icon} </span>
          </div>
          <div className=" text-white  flex flex-col" >
            <span className=' text-[18px] lg:text-[20px]'> { element.title} </span>
            <span className=' text-[14px] lg:text-[19px]'> {element.description} </span>
          </div>

        </div>

          ))
        }
        <div className="flex   justify-center py-5 border-[#202020]  hover:bg-[#48474751] ">
          
          <span className=' flex flex-col items-center'>
          <span className=' rounded-full '>
           <img src={img} className='  drop-shadow-xl h-8 rounded-full' alt="company" />
           </span>
           <span className=' text-white text-[14px]'>version 1.0.0</span>
          </span>
          


        </div>

        
        
      </div>
     </div>


      </div>


    </div>
  );
}
export default Setting

