import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useClerk } from '@clerk/clerk-react';

const HotelCard = ({room, index}) => {
    const {openSignIn} = useClerk();
    const handleNavigate = (e) => {
        e.preventDefault();
        
        if (true) openSignIn(e)
            
    }
  return (
    <Link to={'/rooms/' + room._id} onClick={() => scrollTo(0,0)} key={room._id} className='relative w-full max-w-70 rounded-xl overflow-hidden bg-white text-gray-500/90 shadow-[0px_4px_4px_rgba(0,0,0,0.05)]'>
        <img src={room.images[0]} alt="" />
        {index % 1 === 0 && <p className='absolute px-3 py-1 text-xs font-medium text-gray-800 bg-white rounded-full top-3 left-3'>Best Seller</p>}
        <div className='p-4 pt-5'>
            <div className='flex items-center justify-between'>
                <p className='font-[playfair] text-xl font-medium text-gray-800'>{room.hotel.name}</p>
                <div className='flex items-center gap-1'>
                    <img src={assets.starIconFilled} alt="star-icon" /> 4.5
                </div>
            </div>
            <div className='flex items-center gap-1 text-sm'>
                <img src={assets.locationIcon} alt="location-icon" />
                <span>{room.hotel.address}</span>
            </div>
            <div className='flex items-center justify-between mt-4'>
                <p><span className='text-xl text-gray-800'>${room.pricePerNight}</span> /night</p>
                <button onClick={handleNavigate && <Link to={'/rooms/' + room._id} />} className='px-4 py-2 text-sm font-medium transition-all border border-gray-300 rounded cursor-pointer hover:bg-gray-50'>Book Now</button>
            </div>
        </div>
    </Link>
  )
}

export default HotelCard