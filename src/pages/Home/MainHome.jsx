import React from 'react'
import { Link } from 'react-router-dom'
import { HiLogin } from 'react-icons/hi'
const MainHome = () => {
  return (
    <div className=" lg:space-y-10 space-y-10 px-4 mt-10 lg:mt-0 lg:px-0   ">
    <div className="  flex flex flex-col space-y-2">
       <div className=" text-white text-3xl lg:text-3xl  font-bold text-[#7676ef] drop-shadow-xl ">Welcome</div>
       <div className=" text-white text-[23px] lg:text-[24px] ">To My <span className=' text-black  text-2xl lg:text-3xl  bg-white px-2 rounded-xl rounded-tl-none rounded-br-none border-b-[6px] font-bold border-gray-500 font-bold'>QuickChat</span> Application.</div>
       <div className=" text-white  text-[23px] lg:text-[24px]">The app will help you to intract with anyone, Sign in and enjoy our services.</div>

     </div>
     <div className=" text-white lg:text-[18px]  flex space-x-3 ">
       <Link to={'/register'} className=' border px-3 p-2 w-32 lg:w-20 bg-white lg:px-4 text-black flex justify-center  ' > SignUp </Link>
       <Link to={'/login'} className='  w-32 lg:w-20 justify-center px-3 p-2 lg:px-4  bg-black  flex items-center ' >
         <span className=' lg:text-[23px]'>
         <HiLogin  className=' ' />
         </span>
         <span>Login</span>
       </Link>
     </div>
    </div>
  )
}

export default MainHome
