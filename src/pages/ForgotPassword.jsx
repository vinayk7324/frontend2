import React, { useState } from 'react'
import img from '../assets/meetme.png'
import {HiMail,HiLockClosed, HiCheck, HiEye, HiEyeOff} from 'react-icons/hi'
import {TextInput,Label,Button, Spinner} from 'flowbite-react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'



const ForgotPassword = () => {
  
    const [otp,setOtp] = useState("");
    const [isOtpSend,setIsOtpSend] = useState(false);
    const [loader,setLoader] = useState(false);
    const [verified,setVerify] = useState(false)
    const app_uri = import.meta.env.VITE_APP_URI
    const [NewPassword,setNewPassword] = useState('');
   
    const [cnfNewPassword,setCnfNewPassword] = useState('');
    const [eye1,setEye1]  =useState(true);
    const [eye2,setEye2] = useState(true);
    const navigate = useNavigate();
    const toastOptions = {
        position:'top-center',
        theme:"light"
    };
    const [email,setEmail] = useState('');
    
    const SendOtp = async(e)=>{
        e.preventDefault();
       
        try {
            setLoader(true);
            if(email==''){
                setLoader(false)
                return toast.error('required all field.',toastOptions)
            }
            if(!email.includes('@')){
                setLoader(false);
                return toast.error('invalid username',toastOptions);
            }
            
            
            
            const res = await axios.post(`${app_uri}/api/v2/auth/forgot-password`,{email});
            console.log(res.data);
           

            if(!(res.data.success)){
                setLoader(false);
               return toast.error(res.data.message,toastOptions);

            };
            const otpres = await axios.post(`${app_uri}/api/v2/auth/send-otp`,{email});
            if(!(otpres.data.success)){
                setLoader(false);
                return toast.error(res.data.message,toastOptions);

            }
            setLoader(false);
            const  user = sessionStorage.getItem('userData');
            if(user){
                const {_id} = JSON.parse(user).userDetails
                if(res.data._id===_id){
                    sessionStorage.removeItem('userData');
                }

            }
            toast.success(otpres.data.message,toastOptions);

            setIsOtpSend(true);
            

            
        } catch (error) {
            console.log('sending otp::',error);
            toast.error('error,Please wait.',toastOptions);
            
            
        }

    };
    const verifyOtp = async (e)=>{
        e.preventDefault();
        try {
            setLoader(true);
            if(email=='' || otp==''){
                setLoader(false)
                return toast.error('required all field.',toastOptions)
            }
            if(otp.length!==6){
                setLoader(false);
                return toast.error('OTP must contains six character',toastOptions);
            }
            const varifyEmail = await  axios.post(`${app_uri}/api/v2/auth/email-varification`,{otp});
            if(!varifyEmail.data.success){
                setLoader(false);
                setIsOtpSend(false);
                return toast.error(varifyEmail.data.message);
            }
            toast.success('User varified successfully',toastOptions);
            setVerify(true);
            setLoader(false);
            

            
        } catch (error) {
            console.log('error in varification:: ',error);
            return toast.error('Something went wrong please wait',toastOptions);
            
        }


    };

    const updatePassword = async (e)=>{
        e.preventDefault();
        try {
            setLoader(true)
            if(email=='' || cnfNewPassword=='' || NewPassword==''){
                setLoader(false)
                return toast.error("required all field.",toastOptions);
            }
            if(!email.includes("@")){
                setLoader(false)
                return toast.error("Invalid email address",toastOptions);
            }
            if(NewPassword!==cnfNewPassword){
                setLoader(false)
                return toast.error("Password not matched.",toastOptions)
            }
           
            const res = await axios.post(`${app_uri}/api/v2/auth/update-password`,{email,password:NewPassword});
            if(!res.data.success){
                setLoader(false);
                return toast.error(res.data.message,toastOptions);
            };

            setLoader(false);
            toast.success(res.data.message,toastOptions);
            setTimeout(() => {
                navigate('/login');
            }, 3000);


            
        } catch (error) {
            console.log('error in update password ::',error);
            return toast.error("Error please wait",toastOptions);
            
        }
        

    }

    
  return (
    <div className='  h-screen overflow-hidden   registerBack flex justify-center items-center '>
        <div className=" backdrop-blur-md p-3  rounded-lg  w-full lg:w-[30%] ">
            <div className=" space-y-2 flex flex-col items-center">
                <span>
                    <img className=' h-20' src={img} alt="" />

                </span>
                <span className=' bg-white text-2xl font-bold px-4 py-2 rounded-lg rounded-tr-none rounded-bl-none border-gray-500 border-l-[6px] border-b-[6px]'>
                    {!verified?"Forgot Password":"Create New Password"}
                </span>
            </div>
            <form className="flex max-w-md flex-col text-white lg:w-[40vw] w-full  p-3 gap-4">
      <div className=' relative'>
        <div className="mb-2 block ">
          <Label htmlFor="email1" color={'white'} value="userName" />
        </div>
        <TextInput className=' ' icon={HiMail} value={email}  onChange={(e)=>{setEmail(e.target.value)}}  id="email1" type="" name='email' placeholder='Enter your email address' required />
    {
        verified &&  <span className=' absolute text-2xl right-2 bottom-2 font-bold flex'> 
        <HiCheck color='green'/>
       
     </span>
    }

      </div>
     {
        !verified &&  <div className='relative'>
        <div className="mb-2 block">
          <Label htmlFor="password1" color={'white'} value="Enter OTP" />
        </div>
        <TextInput value={otp} onChange={(e)=>{setOtp(e.target.value)}} disabled={!isOtpSend}  className=''   id="password1" placeholder='' name='password'  required />
       
      
      </div>
     }
     
      {
        !verified && <Button  type="submit" disabled={loader} onClick={!isOtpSend?SendOtp:verifyOtp} className=' uppercase'>{loader?<span> <Spinner/> </span>:`${!isOtpSend?"Send OTP":"Verify"}`} </Button>
      }
      { verified && <div className=' space-y-3'>

        <div className=' relative'>
        <div className="mb-2 block ">
          <Label htmlFor="email1" color={'white'} value="New Password" />
        </div>
        <TextInput className=' ' icon={HiLockClosed} value={NewPassword}  onChange={(e)=>{setNewPassword(e.target.value)}}  id="email1" type={`${eye1?"password":"text"}`} name='email' placeholder='enter new password..' required />
       {
        NewPassword.length>2 &&  <span onClick={()=>{setEye1(!eye1)}} className=' absolute text-2xl right-2 bottom-2 font-bold flex'> 
        {eye1?<HiEye color='gray'/>:<HiEyeOff color='gray' />}
       
     </span>
       }
            
      </div>

        <div className='  relative'>
        <div className="mb-2  block ">
          <Label htmlFor="email1" color={'white'} value="Confirm New Password   " />
        </div>
        <TextInput className=' ' icon={HiLockClosed} value={cnfNewPassword}  onChange={(e)=>{setCnfNewPassword(e.target.value)}}  id="email1" type={`${eye2?"password":"text"}`} name='email' placeholder='confirm new password' required />
        {
            cnfNewPassword.length>2 && <span onClick={()=>{setEye2(!eye2)}} className=' absolute text-2xl right-2 bottom-2 font-bold flex'> 
            {
             eye2? <HiEye color='gray'/>:<HiEyeOff color=' gray' />
            }
            
          </span>
        }
      </div>


      <div className=' w-full'>
      <Button onClick={updatePassword}  className=' w-full uppercase'> {
        !loader?"create Password":<Spinner/>
        
        }</Button>
      </div>

      </div>

      }
      
      <div className=' flex  items-center justify-center'>
        <span className=' lg:text-[22px] text-[14px] uppercase  '>Don't have any account? <Link to={'/register'} className=' text-blue-600 underline underline-offset-6'>register</Link> </span>
      </div>
    </form>


        
        </div>
        <ToastContainer/>
      
    </div>
    
  )
}

export default ForgotPassword
