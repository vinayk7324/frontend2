import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import Chats from './components/Chats.jsx'
import Profile from './components/Profile.jsx'
import Setting from './components/Setting.jsx'
import Home from './pages/Home.jsx'
import { AuthProvider } from './context/contextApi.jsx'
import SetAvatar from './pages/SetAvatar.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import MainHome from './pages/Home/MainHome.jsx'
import About from './pages/Home/About.jsx'
import ContactUs from './pages/Home/ContactUs.jsx'


const router = createBrowserRouter([
  {
    path:'/',
    element:<Home/>,
    children:[
      {
        path:"/",
        element:<MainHome/>
      },
      {
        path:"/about",
        element:<About/>
      },
      {
        path:"/contactus",
        element:<ContactUs/>
      }

    ]
  },
  {
    path:'/register',
    element:<Register/>
  },
  
  {path:'/home',
    element:<App/>,
    children:[
      {
        path:'/home',
        element:<Chats/>,
        
      },
      {
        path:'/home/profile',
        element:<Profile/>
      },
      {
        path:'/home/settings',
        element:<Setting/>
      }
    ]
  },
 
  {
    path:'login',
    element:<Login/>
  },
  {
    path:'avatar',
    element:<SetAvatar/>
  },
  {
    path:'forgot-password',
    element:<ForgotPassword/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
 <AuthProvider>
   <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
  </AuthProvider>
 
  
)
