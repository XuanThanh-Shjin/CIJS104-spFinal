import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { UserButton } from '@clerk/clerk-react'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between px-4 py-3 transition-all bg-white border-gray-300 border- b md:px-8'>
        <Link to='/'>
            {/* <img src={assets.logo} alt="logo" className='h-9 invert opacity-80'/> */}
            <p className='text-3xl text-black h-9'>StayykHome</p>
        </Link>
        <UserButton />
    </div>
  )
}

export default Navbar