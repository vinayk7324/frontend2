import React, { useState } from 'react'
import { useAuth } from '../context/contextApi'
import { useNavigate } from 'react-router-dom'
import { Spinner } from 'flowbite-react'

const Profile = () => {
const user = JSON.parse(sessionStorage.getItem('userData'))
const navigate = useNavigate();
const [loader,setLoader]  = useState(false);

  const {avatarImage,name,email} = user.userDetails
  const handleLogout = ()=>{
    try {
      setLoader(true);
      setTimeout(() => {
        setLoader(false);
        sessionStorage.removeItem('userData');
      navigate('/login');
      
        
      }, 2000);
      
    } catch (error) {
      console.log(error);
      
    }
     
  };
 

  return (
    <div className='text-white  relative'>
      <div className=" top flex space-x-2   items-center  h-14">

        <div className=" lg:text-3xl text-2xl font-bold px-3 lg:px-10">Profile</div>
      </div>


    <div className=" lg:space-y-6 lg:p-8 px-3">
    <div className=" flex items-center  p-2 lg:p-0 justify-center">
        <div className="profileImg border lg:h-52 lg:w-52 h-28  rounded-full lg:border-[6px] border-[4px] p-[4px] flex items-center justify-center">
        <img className='h-full w-full ' src={`data:image/svg+xml;base64,${avatarImage}`} alt="avatar"/>

        </div>
      </div>
      <div className="your name   flex flex-col lg:space-y-2 text-[#c2bfbf]    ">
        <span className='lg:text-[25px] text-green-600 font-bold'>Your Name </span>
        <div className=" border-b-[1px]  py-1 lg:py-2 border-[#171717] flex justify-between items-center text-[#c0bbbb]   lg:text-[23px]">
        <div className=" first-letter:uppercase lg:text-[23px] text-[18px] ">
         {name}
        </div>
          <span className="material-symbols-outlined text-[18px]">
            edit
          </span>
        </div>
        <span className='lg:text-[23px] text-[16px] border-b-[1px] py-2 border-[#171717] '>
          This is not your username or PIN. This name will be visible to your QuickChats contacts.
        </span>
      </div>
      <div className=" text-[#cac8c8]  border-b-[1px] border-[#171717] py-2 ">
        <span className='lg:text-[25px] text-green-600 font-bold '>About</span>

        <div className=" justify-between flex items-center">
        <span className='lg:text-[20px] text-[15px]'> Hey,I am using QuickChat. </span>
        <span className="material-symbols-outlined text-[18px]">
            edit
          </span>

        </div>
      </div>
      <div className="border-b-[1px] border-[#171717] py-2 text-[#cac8c8]  ">
        <span className='lg:text-[25px]   text-green-600 font-bold '>Your email address</span>

        <div className=" justify-between flex">
        <span className='lg:text-[20px] text-[15px]'>{email}</span>
        </div>
      </div>
        <span onClick={handleLogout} className='lg:text-[25px] py-2 text-[18px] flex items-center  cursor-pointer text-red-600 space-x-2 '>
          <span>logout</span>
          <span className=' material-symbols-outlined '>logout</span>
           </span>

        
      
    </div>
   { loader&& <span className=' border absolute flex flex-col top-[50%] left-[45%] items-center bg-white text-black p-2 rounded '>
   <span> <Spinner/></span>
    <span className=' text-[18px] lg:text-[23px] '>Wait</span>
      
    </span>
    }

    </div>
  )
}

export default Profile
