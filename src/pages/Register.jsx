import React, { useState ,useEffect } from 'react'
import { Button, Checkbox, Label, Spinner, TextInput } from "flowbite-react";
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/meetme.png'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import Loader from '../loader/Loader';
import { HiLockClosed,HiEye,HiEyeOff, HiMail } from 'react-icons/hi';

// import { useAuth } from '../context/contextApi.jsx';
const Register = () => {
  // const {auth,setAuth} = useAuth()
  const navigate = useNavigate()
 const[eye,setEye]=useState(false);
 const[eye1,setEye1] = useState(false)
  const app_uri = import.meta.env.VITE_APP_URI;
  const [loader,setLoader]  = useState(false);
  const [isOtpsend,setIsOtpsend] = useState(false);
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    cnfPassword: '',
    agree: false,
    otp: ''
  });
  const toastOptions = {
    position: 'top-center',
    theme: 'light',
   

  }
  const sendOTP = async (e) => {
    e.preventDefault();
    try {
      if (handleValidation()) {
        const { email } = values;
        //sending otp
        setLoader(true);
        const otpres = await axios.post(`${app_uri}/api/v2/auth/send-otp`, { email });
        if (otpres.data.success) {
          toast.success(otpres.data.message, toastOptions);
          setIsOtpsend(true);
          setLoader(false);
          return;

        }
        else {
           toast.error(otpres.data.message, toastOptions);
          setLoader(false);
          return;
        }
        //varified otp
     
      }
    } catch (error) {
      console.log("client side error in register:: ", error);
      setLoader(false);
      toast.error('network error please connect network',toastOptions);
      return;
    }
  }

  const verifyOtp = async (e)=>{
    e.preventDefault(); 
   try {
    if(handleValidation()){
    const {name,email,password,agree,otp} = values
    console.log(otp);
    const resverify = await axios.post(`${app_uri}/api/v2/auth/email-varification`, {otp});

    if (resverify.data.success==false) {
      toast.error(resverify.data.message,toastOptions);
      setLoader(false);
      
      return;
    }
    toast.success(resverify.data.message,toastOptions);
    setLoader(true)
    const res = await axios.post(`${app_uri}/api/v2/auth/register`, { name, email, password, agree });
    if(!res.data.success){
      setLoader(false)
      toast.error(res.data.message,toastOptions);
     
      
      

      

    }
    else{
      setLoader(false);
      toast.success(res.data.success,toastOptions);
    setTimeout(() => {
      navigate('/login')
      
    }, 1000);
    }
    
  }
    return;
   } catch (error) {
    console.log( 'error in registering client side::',error);
    return;
    
   }
  };


  const handleValidation = () => {
    const { name ,email ,password ,agree} = values
    if(!name || !email || !password ){
      toast.error("All fields are required", toastOptions);
      return false

    }

    

    if (values.password.length < 6) {
      toast.error("Password should contain minimum 8 characters", toastOptions);
      return false

    }
    else if (values.password !== values.cnfPassword) {
      toast.error("Password not matched", toastOptions);
      return false;
    }
    else if (!agree) {
      toast.error("be agree with our terms & condtions", toastOptions)
      return false
    }

    return true;


  }
  const handleChange = (e) => {

    setValues({ ...values, [e.target.name]: e.target.value })

  }

  useEffect(()=>{
    const user  = JSON.parse(sessionStorage.getItem('userData'));
    if(user && user.token){
      navigate('/home');
    }
   
  },[])
 


  return (
    <>
      <div className=' h-screen registerBack  w-full flex  lg:items-center lg:justify-center'>
        <div className='  flex border-red-600     '>
          <div className=' lg:rounded-xl  shadow-md h-full  w-[100vw] lg:w-fit backdrop-blur-sm lg:overflow-y-hidden overflow-y-scroll text-white  flex items-center flex-col lg:border p-3'>
            <div className=" flex flex-col items-center space-y-2 ">
              <span className=' '> <img src={Logo} className='  lg:h-24 h-16' alt="" /> </span>
              <span className=' lg:text-3xl text-[24px] font-bold p-1 bg-white  border-b-[8px] border-l-[8px] border-gray-700 text-black px-3 rounded-xl rounded-tr-none rounded-bl-none '>QuickChat</span>
            </div>
            <form className="flex max-w-md lg:w-[40vw]  lg:gap-3 gap-2  flex-col justify-center ">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email2" color={'white'} value="Name" />
                </div>
                <TextInput   onChange={handleChange} value={values.name} name='name' id="email2" type="text" placeholder="Type Name.." required shadow />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email2" color={'white'} value="userName" />
                </div>
                <TextInput icon={HiMail} onChange={handleChange} value={values.email} name='email' placeholder='quickchat123@gmail.com' id="email2" type="email" required shadow />
              </div>
              <div className='relative '>
                <div className="mb-2 block">
                  <Label htmlFor="password2" color={'white'} value="password" />
                </div>
                <TextInput icon={HiLockClosed} onChange={handleChange} id="password2" value={values.password} type={`${eye1?"text":"password"}`}  placeholder=' enter new password...' name='password' required shadow />
                <span onClick={()=>{
          setEye1(!eye1)
        }} className='  absolute right-3 lg:right-4 bottom-3 lg:bottom-2 lg:text-2xl text-[24px]  '>
          {
            eye1?<HiEyeOff color='gray' />:<HiEye color='gray' />
          
          } </span>
              </div>
              <div className=' relative'>
                <div className="mb-2 block">
                  <Label htmlFor="repeat-password" color={'white'} value="Confirm  password" />
                </div>
                <TextInput icon={HiLockClosed}  onChange={handleChange} id="repeat-password" type={`${eye?"text":"password"}`} name='cnfPassword' placeholder=' enter password...' value={values.cnfPassword} required shadow />
                <span onClick={()=>{
          setEye(!eye)
        }} className='  absolute right-3 lg:right-4 bottom-3 lg:bottom-2 lg:text-2xl text-[24px]  '>
          {
            eye?<HiEyeOff color='gray' />:<HiEye color='gray' />
          
          } </span>

              </div>

              {isOtpsend && <div>
                <div className="mb-2 block">
                  <Label htmlFor="repeat-password" color={'white'} value="Enter OTP" />
                </div>
                <TextInput  onChange={handleChange} id="repeat-password" type="text" name='otp' value={values.otp} required shadow />
              </div>
              }

              <div className="flex items-center gap-2">
                <Checkbox onChange={() => setValues({ ...values, agree: !values.agree })} value={values.agree} id="agree" className=' cursor-pointer' />
                <Label htmlFor="agree" color={'white'} className="flex">
                  I agree with the&nbsp;
                  <Link href="#" className="text-cyan-600 hover:underline dark:text-cyan-500">
                    terms & conditions
                  </Link>
                </Label>
              </div>
              <Button onClick={!isOtpsend?sendOTP:verifyOtp} type="submit" disabled={loader} >{loader?<div><Spinner/></div>:!isOtpsend?'send OTP':'verify'} </Button>
              <div className=' pb-2 w-full flex flex-col items-center justify-center relative'>
                {/* <span className=' after:border-b-2 after:border-black after:absolute after:max-w-xl after:min-w-20 after:top-3 '>or</span> */}
                <span className=' text-[14px] lg:text-[23px] uppercase'>
                  Already have an account ? <Link to={"/login"} className='  text-blue-600 underline underline-offset-4 font-bold '>login</Link>
                </span>
              </div>


            </form>
          </div>

        </div>
      </div>
     

      <ToastContainer  />
      
    </>
  )
}

export default Register
