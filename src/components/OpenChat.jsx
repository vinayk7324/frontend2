import React, { useRef } from 'react'
import { useAuth } from '../context/contextApi'
import { useState, useEffect } from 'react';
import ChatBox from './ChatBox';
import axios from 'axios';
import 'emoji-picker-element'
import {io} from 'socket.io-client'
import {v4 as uuidv4} from 'uuid'
import { useNavigate } from 'react-router-dom';
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'


const OpenChat = () => {

    const [contacts, setContacts] = useState([]);
    
    const navigate = useNavigate()
    const api_uri = import.meta.env.VITE_APP_URI
    const { chatId,setCurrentMsg,currentMsg ,setChatOpen,chatOpen} = useAuth()
    const [emojiPicker, setEmojiPicker] = useState(false);
    const [inputMsg, setInputMsg] = useState('');
    const [messages, setMessages] = useState([]);
    const [arrivalMsg,setArrivalMsg] = useState("")
    const [selectedEmoji,setSelectedEmoji] = useState("")
    const scrollRef = useRef();
    const [current,setCurrent]= useState(undefined);
    

    const socket = useRef();

    useEffect(()=>{
        const user = sessionStorage.getItem("userData")
        if(user){
            const currentUser = JSON.parse(user);
            setCurrent(currentUser.userDetails)
        }
        else{
            navigate('/register')
        }

    },[])

    useEffect(() => {
        const getMsg = async () => {
            try {
              
               if(current){
                const msgRes = await axios.post(`${api_uri}/api/v2/message/get-message`, {
                    from: current._id,
                    to: chatId
                });
              
                setMessages(msgRes.data);
               }

            } catch (error) {
                console.log(error);

            }

        }
        getMsg();

    }, [chatId,current])

  
    useEffect(() => {
        const fetchUsers = async () => {
            try {

               
               if (current !=undefined) {
                const { data } = await axios.get(`${api_uri}/api/v2/auth/getAllUsers/${current._id}`);


                setContacts(data.users);
                
               }
            } catch (error) {
                console.log(error);

            }

        }
        fetchUsers();
    }, [current])

   const  handleSetEmoji = (e)=>{
    const emoji = e.native;
    setInputMsg(inputMsg+emoji);
    

   }
    useEffect(()=>{
        
        if(current){
            socket.current = io(api_uri,{
                withCredentials:true
            });
            socket.current.emit("add-user",current._id);
        }

    },[current]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        try {
     
            setCurrentMsg(inputMsg);
            const res = await axios.post(`${api_uri}/api/v2/message/send-message`, {
                from: current._id,
                to: chatId,
                message: inputMsg
            });

            socket.current.emit("send-msg",{
                to:chatId,
                from:current._id,
                message:inputMsg
            })
            const msgs = [...messages];
            msgs.push({fromSelf:true,message:inputMsg});
            setMessages(msgs);
            setInputMsg("")
           
            
        } catch (error) {
            console.log(error);

        }


    };
    
   

    useEffect(()=>{
        if(socket.current){
            socket.current.on("msg-recieve",(msg)=>{
                setArrivalMsg({fromSelf:false,message:msg});
            })
        }
    },[socket.current]);

    
    useEffect(()=>{
        arrivalMsg && setMessages((prev)=>[...prev,arrivalMsg]);
       

    },[arrivalMsg]);

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({
            behaviour:"smooth",

        })

    },[messages]);
    const handleSendThroghKey = (e)=>{
        
        if(e.key==="Enter"){
            handleSendMessage(e);
        }

    }
   

   
    return (

        <div className={` lg:h-full    pb-0  w-full   `}>
            {
               
               chatId != undefined ? contacts.map((contact, index) => {
                    if (contact._id === chatId) {
                      
                        return (
                            <div key={contact._id} className='text-white registerBack  flex flex-col justify-between lg:h-full '>
                                <div className="top flex justify-between  items-center px-2  py-3 lg:rounded-tr-md bg-[#4c4c53]">

                                    
                                    <div className=" flex space-x-2 lg:space-x-4 items-center ">
                                        <span onClick={()=>{setChatOpen(!chatOpen)}} className=' block lg:hidden'>
                                            <span className='material-symbols-outlined  text-[18px]'>
                                                arrow_back

                                            </span>
                                        </span>
                                        <div className=" lg:h-12 lg:w-12 h-9 w-9 border-[3px] flex items-center justify-center rounded-full ">
                                            <img className='h-full w-full ' src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avatar" />

                                        </div>
                                        <span className=' flex flex-col lg:text-[20px] text-[14px]'>
                                            <span className=' first-letter:uppercase'>{contact.name}</span>
                                            <span >online</span>
                                        </span>
                                    </div>
                                    <div className=" flex lg:space-x-4 space-x-2 ">
                                        <div className="">
                                            <span className="material-symbols-outlined text-[19px] lg:text-2xl">
                                                videocam
                                            </span>


                                        </div>
                                        <div className="">
                                            <span className="material-symbols-outlined text-[19px] lg:text-2xl">
                                                call
                                            </span>
                                        </div>

                                        <div className="">
                                            <span className="material-symbols-outlined text-[19px] lg:text-2xl">
                                                search
                                            </span>

                                        </div>
                                        <div className="">
                                            <span className="material-symbols-outlined text-[19px] lg:text-2xl">
                                                more_vert
                                            </span>

                                        </div>
                                    </div>
                                </div>
                                <div id='middle'  className="middle backdrop-blur-sm   relative space-y-2 flex-col  h-[80vh]   flex  p-3 lg:h-full overflow-y-scroll">
                                    {

                                        messages.map((msg) => (
                                           
                                            
                                            <div className=" ">
                                                <span key={uuidv4()} ref={scrollRef}  className={`${msg.fromSelf ? " relative    flex lg:px-4 px-3 lg:py-2 py-1 text-wrap float-right  w-fit bg-blue-600 lg:rounded-xl rounded-md rounded-tr-none shadow-xl   " : " flex w-fit lg:px-4 lg:py-2 py-1 px-3 text-wrap  bg-black rounded-tl-none float-start lg:rounded-xl rounded-lg "}`}>
                                                <div className='text-wrap '>
                                                    <p className=' w-full text-wrap text-[17px] lg:text-[23px] '> {msg.message} </p>
                                                    
                                                </div>

                                            </span>
                                            </div>
                                        ))
                                    }
                                </div>


                                <div className="buttom py-1 lg:rounded-br-md lg:h-20 flex w-full px-1 space-x-2 lg:space-x-3 lg:px-3 items-center bg-[#4c4c53]">
                                    <div className=" relative   ">
                                        <button onClick={() => setEmojiPicker(!emojiPicker)} className=" hover:bg-[#3f3e3e] lg:h-10 lg:w-10 rounded-full flex items-center justify-center">
                                            <span className="material-symbols-outlined lg:text-3xl">
                                                mood
                                            </span>
                                        </button>
                                        {emojiPicker && <div className=" absolute bottom-14 -left-3 ">
                                            <Picker data={data} onEmojiSelect = {handleSetEmoji} />
                                        </div>

                                        }

                                    </div>
                                    <button className=' lg:block hidden hover:bg-[#3f3e3e] lg:h-10 lg:w-10 rounded-full flex items-center justify-center'>
                                        <span className="material-symbols-outlined lg:text-3xl">
                                            add
                                        </span>
                                    </button>
                                    <div className=" flex items-center  h-[40px] lg:h-12 ">
                                        <input type="text" value={inputMsg} onChange={(e) => {
                                         
                                            
                                            setInputMsg(e.target.value)}} onKeyDown={handleSendThroghKey} placeholder='Type a message ' className=' lg:text-[23px]  h-full text-[15px] rounded-sm lg:w-[50vw] w-[75vw] border-[0px] placeholder:text-[14px]  bg-[#242429] placeholder:text-[#d8d6d6] lg:placeholder:text-[23px]'/>

                                    </div>
                                  
                                    {
                                        inputMsg == '' ? <button className=" hover:bg-[#3f3e3e]  h-10 w-10 rounded-full flex items-center justify-center">
                                            <span className="material-symbols-outlined lg:text-3xl">
                                                mic
                                            </span>
                                        </button> : <button id='send-msg' onClick={handleSendMessage}  className=" hover:bg-[#3f3e3e]  h-10 w-10 rounded-full flex items-center justify-center">
                                            <span className="material-symbols-outlined lg:text-3xl">
                                                send
                                            </span>
                                        </button>
                                    }
                                </div>


                            </div>
                        )
                    }
                    

                }) : <ChatBox/>
            }

        </div>
    )
}

export default OpenChat
