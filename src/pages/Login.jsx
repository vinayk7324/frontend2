import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Label, Spinner, TextInput } from "flowbite-react";
import { Link, useNavigate } from 'react-router-dom';
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Loader from '../loader/Loader';
import { useAuth } from '../context/contextApi';
import img from '../assets/meetme.png'
import { HiEye, HiEyeOff, HiLockClosed, HiMail } from 'react-icons/hi';



const Login = () => {  
  const{auth,setAuth} = useAuth()
  const [showPassword,setShowPassword] = useState(false);
  const [eye,setEye] = useState(false)
  const toastOptions = {
    position: 'top-center',
    theme: 'light',
  }
  const app_uri = import.meta.env.VITE_APP_URI;

  const [data,setData] = useState({
    email:'',
    password:'',
    remember:false
  });
  const [loader,setLoader] = useState(false)
  const handleChange = (e)=>{
    setData({...data,[e.target.name]:e.target.value});
  }
  const handleLogin = async(e)=>{
    e.preventDefault();
    try {
     
      const {email,password,remember} = data
      if(!email || !password || password==''||email=='' || !remember){
        toast.error("All field required",toastOptions);
        return;

      }
      if(!email.includes('@')){
        toast.error('Invalid entered email address',toastOptions);
        return;

      }
      setLoader(true);
      const res = await axios.post(`${app_uri}/api/v2/auth/login`,{email,password})
      if(res.data.success==true){
        setLoader(false)
        toast.success(res.data.message,toastOptions);
        sessionStorage.setItem('userData',JSON.stringify(res.data));


        //Set data 
       const user = sessionStorage.getItem('userData')
       if(user){
        try {
          const parseData = JSON.parse(user)
          setAuth({
            ...auth,
            user:parseData.userDetails,
            token:parseData.token
          })
          
        } catch (error) {
          console.log('error in importing data from sessional storage ::',error);
          
          
        }
       }
  
     



        setTimeout(() => {
          navigate('/avatar')
          
        }, 1000);
        
      }
     else{
      setLoader(false)
      toast.error(res.data.message,toastOptions)
     }
     
     

    } catch (error) {
      console.log(`Error in client side login :: ${error} `);
    setLoader(false);
    }

  }
  const navigate = useNavigate()
  useEffect(()=>{
    const user  = JSON.parse(sessionStorage.getItem('userData') );
    
    if(user && user.token){
      navigate('/home');
    }

  },[])

 
  return (
    <div className=' relative registerBack lg:flex items-center flex-col justify-center h-screen'>
      <div className=' lg:border backdrop-blur-sm h-full lg:h-fit text-white p-2  flex flex-col items-center justify-center rounded-md shadow-md'>
      <span className='lg:text-2xl flex items-center justify-center flex-col  space-y-2  text-2xl font-bold lg:text-[#226264] '>
        <span className='  '>
          <img className=' h-24 lg:h-16' src={img} alt="" />
        </span>
        <span className=' bg-white text-black border-l-[8px] rounded-lg rounded-tr-none rounded-bl-none border-b-[8px] border-gray-600 px-3' > QuickChat </span>
        
         </span>
          <form className="flex  flex-col lg:w-[20vw] w-full  p-3 gap-4">
      <div>
        <div className="mb-2 block ">
          <Label htmlFor="email1" color={'white'} value="userName" />
        </div>
        <TextInput className=' ' icon={HiMail} value={data.email} onChange={handleChange} id="email1" type="" name='email' placeholder='quickchat7324@gmail.com' required />
      </div>
      <div className='relative'>
        <div className="mb-2 block">
          <Label htmlFor="password1" color={'white'} value="password" />
        </div>
        <TextInput icon={HiLockClosed}  className='' value={data.password} onChange={handleChange} id="password1" placeholder='your password..' name='password' type={`${eye?'text':'password'}`} required />
        <span onClick={()=>{
          setEye(!eye)
        }} className='  absolute right-3 lg:right-4 bottom-3 lg:bottom-3 lg:text-[22px] text-[24px]  '>
          {
            eye?<HiEyeOff color='gray' />:<HiEye color='gray' />
          
          } </span>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="remember"  name='remember' value={data.remember} onChange={(handleChange)} />
        <Label color={'white'} htmlFor="remember">Remember me</Label>
      </div>
      <Button onClick={handleLogin} type="submit" disabled={loader} className=' uppercase'>{loader?<div><Spinner/></div>:'login'} </Button>
      <div className=' text-[15px] lg:text-[16px]  flex items-center justify-center'>
        <Link to={'/forgot-password'} className=' relative before:absolute   before:border-b-[1px] before:top-[12px] lg:before:right-24 lg:before:top-[14px] before:right-28   before:w-full after:absolute after:left-28   after:border-b-[1px] after:top-[12px] lg:after:top-[14px] lg:after:left-24   after:w-full text-blue-600 underline underline-offset-4' > forgot password</Link>
      </div> 
      <div className=' flex  items-center justify-center'>
        <span className=' lg:text-[16px] text-[14px] uppercase  '>Don't have any account? <Link to={'/register'} className=' text-blue-600 underline underline-offset-6'>register</Link> </span>
      </div>
    </form>
      </div>
      <ToastContainer autoClose={1000}  hideProgressBar={true} closeButton={false} />
      
      
      
    </div>
  )
}

export default Login
