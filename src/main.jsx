import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Homepage from './Pages/Homepage.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './Pages/Login.jsx'
import Register from './Pages/Register.jsx'
import { ToastContainer } from 'react-toastify/unstyled'
import Startingpage from './Pages/Startingpage.jsx'
import Pagenotfound from './Pages/Pagenotfound.jsx'
import 'react-toastify/dist/ReactToastify.css'
import IdleLogout from './Pages/Ideallogout.jsx'
import Adminpassword from './Comman/Adminpassword.jsx'
//import Adminpanel from './Pages/Adminpanel.jsx'
//import AdminPanelnew from './Adminpanel/Adminpanel1.jsx'
import Adminpanel from './Pages/Adminpanel.jsx'
import Addtocart from './Pages/Mainoperation/Addtocart.jsx'
import Movetotop from './Movetotop.jsx'
import Reports from './Pages/Adminpanelnew/Reports.jsx'
let allroutes=createBrowserRouter([
  {
    path:'/',
    element:<Homepage/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/register',
    element:<Register/>
  },
  {
    path:'/Startpage',
    element:<Startingpage/>
  },
  
  {
    path:'/adminpass',
    element:<Adminpassword/>
  },
  {
    path:'/adminpanel',
    element:<Adminpanel/>
  },
  {
    path:'/orders',
    element:<Addtocart/>
  },
  {
    path:'/reports',
    element:<Reports/>
  },
  {
    path:'*',
    element:<Pagenotfound/>
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Movetotop/>
    <IdleLogout/>
  <RouterProvider router={allroutes}/>
  <ToastContainer  position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"/>
  </StrictMode>,
)
