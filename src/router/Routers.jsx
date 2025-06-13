import React from 'react'
import {createBrowserRouter,RouterProvider,Outlet} from "react-router";
import Rejester from '../pages/Rejester';
import Login from '../pages/Login';
import Admin from '../pages/Admin';
import AddStudent from '../pages/AddStudent';
import Teacher from '../pages/Teacher';
import Wlecome from '../pages/Wlecome';
import Talab from '../pages/Talab';
import Ideas from '../pages/Ideas';


function Layout(){
    return(
        <>
        < Outlet />
        
        </>
    )
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children:[
      {path: "/" , element:<Wlecome/>},
    {path: "Rejester" , element:<Rejester/>},
        {path: "Login" , element:<Login/>},
       {path : "Talab" , element: <Talab />},
        {path: "Teacher" , element:<Teacher/>},
        {path: "Admin" , element:<Admin/>},
         {path: "AddStudent" , element:<AddStudent/>},
                  {path: "Ideas" , element:<Ideas/>},

       
    ]
  },
]);

function Routers() {
  return (
    <div>
       <RouterProvider router={router} />
    </div>
  )
}

export default Routers
