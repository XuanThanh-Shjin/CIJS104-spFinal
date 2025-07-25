import React from 'react'
import Navbar from '../../components/HotelOwner/Navbar'
import Sidebar from '../../components/HotelOwner/Sidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='flex flex-col h-screen'>
        <Navbar />
        <div className='flex h-full'>
          <Sidebar />
          <div className='flex-1 h-full p-4 pt-10 md:px-10'>
            <Outlet />
          </div>
        </div>
    </div>
  )
}

export default Layout