import { Drawer, Sidebar, TextInput } from 'flowbite-react'
import React, { useEffect,useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import img from '../assets/meetme.png'
import {  HiLogin,
  HiSearch,
  
  HiMenu,
   } from 'react-icons/hi'
import { useId } from 'react'
import MainHome from './Home/MainHome'

const Home = () => {
  const navigate = useNavigate();
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);


  const handleClose = () => setIsOpen(false);
  const HomeArr = [
    {
      title: "Home",
      Icon: "home",
      slug: "/"
    },
    {
      title: "About",
      slug: "/about",
      Icon:"contact_support"
    },
    {
      title: "Contact us",
      Icon: "call",
      slug: "/contactus"
    },
    {
      title: "Login",
      Icon: "login",
      slug: "/login"
    },
    {
      title: "SignUp",
      Icon: "edit",
      slug: "/register"
    },
  ]
  const contactArr = [
    {
      slug:"",
      
      Icon:""

  }
]
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('userData'));
    if (user && user.token) {
      navigate('/home');
    }



  }, [])

  return (
    <div className='homeBackground  h-[100vh] flex flex-col   '>
      <div className=" shadow-sm shadow-black   text-white flex items-center justify-between px-4 p-2 ">
        <div className="company flex   items-center lg:space-x-3 lg:text-[20px] text-[16px] font-bold" >
          <img src={img} className=' lg:block hidden h-12' alt="" />
          <span className=' text-[23px] '> QuickChats </span>

        </div>


        <div className=" space-x-10     w-fit hidden lg:block">
         <div className=" flex space-x-2 ">
         {
            HomeArr.map((element) => (
              <span key={id} className=' w-32   ' >
                <NavLink to={element.slug} className={({isActive})=> ` ${isActive?" bg-[#c7c7cb] text-black ":"text-[#c7c7cb] hover:bg-[#c7c7cb]  hover:text-black"} flex items-center  space-x-2  py-2 w-full justify-center transition-all duration-300`} >
                  <span class="material-symbols-outlined lg:text-[26px]">
                    {element.Icon}
                  </span>
                  <span className=''> {element.title} </span>

                </NavLink>
              </span>
            ))

          }
         </div>
        
        </div>
        <div className="flex  lg:hidden block  text-[23px] items-center justify-center">
        <HiMenu onClick={()=>setIsOpen(true)} className=' text-[24px]' />
      </div>
      <Drawer  className='  bg-[#060f1d] text-white lg:hidden' open={isOpen} onClose={handleClose}>
        <Drawer.Header title="MENU" titleIcon={() => <></>} />
        <Drawer.Items>
          <Sidebar
            aria-label="Sidebar with multi-level dropdown example"
            className="[&>div]:bg-transparent [&>div]:p-0"
          >
            <div className="flex h-full flex-col justify-between py-2">
              <div>
                <form className="pb-3 md:hidden ">
                  <TextInput icon={HiSearch} type="search" placeholder="Search" required size={32} />
                </form>
                <Sidebar.Items>
                  <Sidebar.ItemGroup className='  ' >
                    <div className="  space-y-4  ">
                    {
                      HomeArr.map((element) => (
                        <span key={id} className=' w-32   ' >
                          <NavLink to={element.slug} className={({isActive})=> ` ${isActive?" bg-[#c7c7cb] text-black ":"text-[#c7c7cb] hover:bg-[#c7c7cb]  hover:text-black"} flex items-center  space-x-2  py-2 w-full ps-2 transition-all duration-300`} >
                            <span class="material-symbols-outlined lg:text-[26px]">
                              {element.Icon}
                            </span>
                            <span className=''> {element.title} </span>
          
                          </NavLink>
                        </span>
                      ))

                    }
                    </div>

                    
                  </Sidebar.ItemGroup>

                  <Sidebar.ItemGroup>
                   <div>
                    {

                    }

                   </div>
                  </Sidebar.ItemGroup>
                </Sidebar.Items>
              </div>
            </div>
          </Sidebar>
        </Drawer.Items>
      </Drawer>
      </div>

      <div className="   p-2 backdrop-blur-xl flex flex-col  h-full  items-center lg:justify-center p-2  ">
       <Outlet/>

      </div>

    </div>
  )
}

export default Home
