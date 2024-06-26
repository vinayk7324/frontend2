import { Button } from 'flowbite-react'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import img from '../assets/meetme.png'

const Home = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    const user  = JSON.parse(sessionStorage.getItem('userData'));
    if(user && user.token){
      navigate('/home');
    }
    
    
    
  },[])
  
  return (
    <div className='homeBackground  h-[100vh] flex flex-col items-center  lg:space-y-28 space-y-6 '>
        <div className=" flex items-center backdrop-blur-lg p-2 flex-col  space-y-2   justify-center">
            <img className=' lg:h-52 h-14' src={img} alt="" />
            <span className=' lg:text-[5rem] text-[28px]  drop-shadow-xl bg-white px-2 rounded-xl rounded-tl-none rounded-br-none border-b-[6px] font-bold border-gray-500 '>QuickChats</span>
        </div>
        <div className="  p-2 backdrop-blur-xl flex flex-col justify-center items-center w-fit  p-2  ">
        <div className="  flex flex flex-col space-y-2">
        <div className=" text-white text-3xl lg:text-5xl  font-bold text-[#7676ef] drop-shadow-xl ">Welcome</div>
        <div className=" text-white text-[23px] lg:text-[30px] ">To My <span className=' text-black  text-2xl lg:text-4xl  bg-white px-2 rounded-xl rounded-tl-none rounded-br-none border-b-[6px] font-bold border-gray-500 font-bold'>QuickChat</span> Application.</div>
        <div className=" text-white  text-[23px] lg:text-[30px]">The app will help you to intract with anyone, Sign in and enjoy our services.</div>
       
        </div>
        <div className=" lg:flex space-x-5 p-2 ">
            <Link to={'/register'} className='  ' ><Button color={'blue'} className='' size={'xl'} gradientDuoTone={'greenToBlue'}>Signup</Button></Link>
            <Link to={'/login'} ><Button color={'success'} size={'xl'} gradientDuoTone={'purpleToBlue'}>Login </Button></Link>
        </div>
        </div>
    
    </div>
  )
}

export default Home
