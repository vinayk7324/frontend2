import React, { useEffect, useState } from 'react'
import { Link,NavLink } from 'react-router-dom'
import { Tooltip } from 'flowbite-react'
import { useId } from 'react'

const SideBar = () => {
    const [isHome,setIsHome] = useState(true);
    const id  = useId();
    const [useDetails,setUserDetails]  = useState([]);
    
    const optionsArr = [
        {
            to:'profile',
            title:'Account',
          
            tooltip:'My Profile',
            img:useDetails.avatarImage
        },
        {
            to:'settings',
            title:"Settings",
            icon:"settings",
            tooltip:'Settings'
        }
    ]
    useEffect(()=>{
        const user = sessionStorage.getItem('userData');
        if(user){
            const parse = JSON.parse(user);
            setUserDetails(parse.userDetails);
        }

    },[])
   

  
   
    return (
        <div className='   lg:h-full  bg-[#3f3f45] lg:w-[5vw]  flex lg:flex-col items-center lg:py-4 p-2 lg:space-y-6 lg:justify-start justify-between lg:rounded-lg lg:rounded-r-none'>
            <div className=" ">
                <Tooltip content={'Chats'} placement='top' animation={'duration-1000'} className='' style='light'  >
                    <NavLink to={'/home'} onClick={()=>{setIsHome(true)}} className={ ` ${isHome?' bg-[#656565]  ':''} transition-all duration-300 lg:hover:bg-[#656565] flex  items-center justify-center lg:w-10 lg:h-10 rounded-full`} >

                    <span className="material-symbols-outlined  text-[#d6d6d7] lg:text-3xl  text-[18px]  px-3 rounded-full py-1  flex items-center justify-center">
                            chat
                        </span>
                      
                        
                    </NavLink>
                    <span className=' text-white block lg:hidden text-[16px] text-center'>chats</span>
                </Tooltip>

            </div>
          
           

           
                {
                    optionsArr.map((ele)=>(
                        <Tooltip key={useId()} content={ele.tooltip} placement='top' animation={'duration-1000'} style='light' >
                        <NavLink to={`/home/${ele.to}`} onClick={()=>{setIsHome(false)}} className={ ({isActive})=>` ${isActive?` ${!ele.img?"bg-[#656565]":" lg:bg-[#656565]  border-[#a3a3a3]"}  `:''}  transition-all duration-300 lg:hover:bg-[#656565] flex items-center   justify-center    ${!ele.img?"rounded-full":"  lg:p-1 "} lg:h-10 lg:w-10 w-10 rounded-full `}>
    
                           {
                            ele.img?<span className=' lg:h-full lg:w-full h-7 w-7  '>
                                 <img className='h-full w-full rounded-full border-2 ' src={`data:image/svg+xml;base64,${ele.img}`} alt="avatar" />
                            </span>:<span className="material-symbols-outlined  text-[#d6d6d8]   rounded-full text-[23px] lg:text-3xl flex items-center justify-center">
                                {ele.icon}
                            </span>
                           }
                          
                        </NavLink>
                        <span className=' text-white block lg:hidden text-[16px] text-center'> 
                            
    
                            
                           {ele.title}
                            </span>
                    </Tooltip>
                    ))
                }
            
          


        </div>
    )
}

export default SideBar
