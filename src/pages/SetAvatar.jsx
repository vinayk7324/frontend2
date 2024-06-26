import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { json, useNavigate } from 'react-router-dom'
import {Buffer} from 'buffer'
import { Button, Spinner } from 'flowbite-react';
import { ToastContainer, toast } from 'react-toastify';
import Loader from './../loader/Loader';
import { useAuth } from '../context/contextApi';
import img from '../assets/meetme.png'

const SetAvatar = () => {
    const api = "https://api.multiavatar.com/45678945"
    const navigate  = useNavigate();
    const [avatars,setAvatars]  = useState([])
    const [isLoading,setIsloading] = useState(true)
    const [selectedAva,setSelected] = useState(undefined);
    const {auth} = useAuth();
    const toastOptions = {
        position: 'top-center',
        theme: 'dark',
      }
      const api_uri = import.meta.env.VITE_APP_URI


    const setProfilePicture = async (e)=>{
        e.preventDefault();

     try {
        if(selectedAva===undefined){
            toast.error('Please select an avatar',toastOptions);
            return;
        }else{
            const user = JSON.parse(sessionStorage.getItem('userData'))
            const {data} = await axios.post(`${api_uri}/api/v2/auth/setAvatar/${user.userDetails._id}`,{
                image:avatars[selectedAva]
            });
          
            if(data.isSet){
                user.userDetails.isAvatarImageSet = true;
                user.userDetails.avatarImage = data.image;
                sessionStorage.setItem('userData',JSON.stringify(user))

                toast.success('profile image set successfully',toastOptions);
                setTimeout(() => {
                    navigate('/home')
                    
                }, 3000);
            }
            else{
                toast.error('error in setting avatar, please try again',toastOptions)
            }
        }
        
     } catch (error) {
        console.log(error);
     }

        
    };

    useEffect( ()=>{
        const fetchData = async()=>{
            const data = [];
        for(let i=0; i<4;i++){
            const image = await axios.get(`${api}/${Math.round(Math.random()*1000)}`);
            const buffer = new Buffer(image.data);
            data.push(buffer.toString('base64'))
        }
        setAvatars(data);
        setIsloading(false);
        }
        fetchData();
    },[]);
    useEffect(()=>{
        const user = JSON.parse(sessionStorage.getItem('userData'));
        if(user.userDetails.isAvatarImageSet){
            navigate('/home')
        }
        
        

    })

  return (
    
    <div className=' registerBack h-screen   '>
       
        
               <div className=" h-full flex items-center space-y-5 justify-center flex-col backdrop-blur-xl ">
            <div className=" lg:text-2xl space-y-2 text-white backdrop-blur-lg flex-col items-center  rounded-full lg:p-2 font-bold justify-center flex  ">
                <span> 
                    <img src={img} className=' h-20' alt="" />
                </span>
                
                <span className=' border px-2 p-1 bg-white border-b-[8px] border-gray-500 text-black rounded-md rounded-tr-none rounded-bl-none'>Pick an avatar as your profile picture</span>
                
                </div>
            {
                !isLoading?<div className="flex justify-center  lg:space-x-9 space-x-3 lg:p-4 lg:w-[50%] ">
                {
                    avatars.map((avatar,index)=>(
                        <div onClick={()=>setSelected(index)} className={`avatar  rounded-full  hover:border-[6px] lg:h-24 lg:w-24    transition-all duration-100 cursor-pointer border-white flex items-center justify-center  ${selectedAva === index ?'border-[6px] border-blue-600':''}`} key={index} >
                            <img className='lg:h-20 lg:w-20  h-12 ' src={`data:image/svg+xml;base64,${avatar}`} alt="avatar"
                             />
                        </div>
                    ))
    
                }
                </div>: <div className=" flex flex-col font-bold border bg-white p-2 px-4 rounded-xl shadow-lg shadow-black">
                <Spinner size={'xl'} />
                Wait...
                </div>
            }
            <button onClick={setProfilePicture} className=' text-[14px] font-bold rounded-md px-4 py-2 hover:bg-fuchsia-600 shadow-lg shadow-gray-700 transition-all duration-150 uppercase  bg-fuchsia-700 text-white
            '  >Set as Profile picture</button>

        </div>
        <ToastContainer/>
        
    
     
    </div>
  )
}

export default SetAvatar
