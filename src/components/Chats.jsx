import React, { useEffect, useId, useState } from 'react'
import { Button, Dropdown, Spinner, TextInput } from 'flowbite-react'
import { HiFire, HiPlus, HiSearch, HiViewGrid } from 'react-icons/hi';
import axios from 'axios';
import { useAuth } from '../context/contextApi';
import { v5 as uuid5} from 'uuid'


const Chats = () => {
  const [contacts, setContacts] = useState([])
  const api_uri = import.meta.env.VITE_APP_URI
  const { setChatOpen, chatOpen, setChatId, chatId, currentMsg, setCurrentMsg } = useAuth();
  const [loader, setLoader] = useState(false);
  
 
  const dropDownArr = [
    {
      link: '',
      title: 'Dashboard',
      icon: HiViewGrid,
      func: () => { },
      id:1
    },
    {
      link: '',
      title: 'Dashboard',
      icon: HiViewGrid,
      func: () => { },
      id:2

    },
  ]


 




  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoader(true);

        const user = sessionStorage.getItem('userData');
        if (user) {
          const {_id} = JSON.parse(user).userDetails
         
          
       
          const { data } = await axios.get(`${api_uri}/api/v2/auth/getAllUsers/${_id}`)
          setContacts(data.users);

          setLoader(false);
        }

      } catch (error) {
        console.log(error);

      }

    }
    fetchUsers();


  }, [])


  return (
    <div className={` lg:block  ${chatOpen ? "hidden" : ""}     relative flex flex-col relative text-white    `}>
      <div className="top space-y-3 w-full p-3">
        <div className=" flex items-center py-4  justify-between">
          <span className='lg:text-3xl font-bold text-center lg:block hidden'>Chats</span>
          <span className=' lg:hidden block text-[28px] font-serif'>QuickChat</span>
          

        </div>


        <div className="searchbar lg:h-[53px] h-[34px]  border-[#4a4949] bg-[#484848] p-[2px]
          rounded-md  flex items-center w-full">
          <div className=" lg:px-4 px-1 h-full    border-r-0 flex items-center rounded-md rounded-r-none  justify-center   ">
            <span className="material-symbols-outlined lg:text-2xl ">
              search
            </span>
          </div>
          <input type="text" placeholder='search...' className='  border-none focus-within:border-0  placeholder:text-gray-50 text-[15px] lg:text-[23px]  h-full  bg-inherit w-full' />

        </div>



      </div>


      <div id="contactList" className="   overflow-y-scroll   lg:h-fit  ">
        {

          contacts.length === 0 ? <div>Not found</div> : <div>


            {
              !loader ? contacts.map((contact) => (
                <div key={contact._id} onClick={
                  () => {
                    setChatId(contact._id);
                    setChatOpen(true);
                  }}
                  className="connection px-2  cursor-pointer space-x-2 lg:pl-2 border-[#3b3b3b] border-b-2  hover:bg-[#48474751] lg:space-x-3    lg:h-20 flex lg:justify-between items-center " id='connection1'>
                  <div className=" lg:h-12  lg:w-12 h-10 w-10  border-[4px] rounded-full flex  items-center justify-center">
                    <img className='h-full w-full ' src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avatar" />

                  </div>


                  <div className=" flex   justify-between h-full items-center    w-5/6">
                    <div className=" flex flex-col lg:justify-between   space-y-1">
                      <div className="name lg:text-[19px] text-[18px] first-letter:uppercase">{contact.name}</div>
                      <div className="lastMessage lg:text-[18px] text-[12px]">
                        {
                          contact.lastMsg.map((lastMessage) => {
                            if (contact._id == lastMessage.id) {
                              return lastMessage.msg;

                            }


                          })
                        }

                      </div>
                    </div>
                    <div className=" dropBox  flex flex-col h-14 items-center justify-center space-y-1 lg:p-2 ">
                      <div className=' lg:text-[15px] text-[12px] lg:pr-2'>Yesterday</div>
                      <span className=' flex items-center text-[10px] justify-center z-[2] transition-all duration-700 dropItem'>
                        <Dropdown className='bg-black border-none     ' label="" inline >

                          {
                            dropDownArr.map((ele) => (
                              <Dropdown.Item icon={ele.icon} key={ele.id} className=' text-white' > {ele.title} </Dropdown.Item>

                            )

                            )
                          }

                        </Dropdown>
                      </span>
                    </div>

                  </div>
                </div>
              )) : <div className=" h-full w-full flex items-center justify-center">
                <Spinner size={'md'} />
              </div>
            }
          </div>

        }
      </div>

    </div>
  )
}


export default Chats

