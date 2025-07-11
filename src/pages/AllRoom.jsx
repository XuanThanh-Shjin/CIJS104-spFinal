import React from 'react'
import { assets, roomsDummyData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import StarRating from '../components/StarRating/StarRating';

const AllRoom = () => {
    const navigate = useNavigate();
    return (
        <div className='flex flex-col-reverse items-center justify-between px-4 lg:flex-row pt-28 md:pt-32 md:px-16 lg:px-24 xl:px-32'>
            <div className='flex flex-col items-start text-left'>
                <h1 className='font-[playfair] text-4xl md:text-[40px]'>Hotel Rooms</h1>
                <p className='max-w-2xl mt-2 text-sm md:text-base text-gray-500/90'>Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories.</p>
            </div>

            {roomsDummyData.map((room) => (
                <div>
                    <img onClick={() => {navigate(`/room/${room._id}`); scrollTo(0, 0)}}
                    src={room.images[0]} alt="hotel-img" title='View Room Details' className='object-cover shadow-lg cursor-pointer max-h-64 md:w-1/2 rounded-xl' />
                    <div className='flex flex-col gap-2 md:w-1/2'>
                        <p className='text-gray-500'>{room.hotel.city}</p>
                        <p onClick={() => {navigate(`/rooms/${room._id}`); scrollTo(0, 0)}} className='text-3xl text-gray-800 font-[playfair] cursor-pointer'>{room.hotel.name}</p>
                        <div className='flex items-center'>
                            {/* <StarRating /> */}
                            <p className='ml-2'>260+ reviews</p>
                        </div>
                        <div className='flex items-center gap-1 mt-2 text-sm text-gray-500'>
                            <img src={assets.locationIcon} alt="location-icon" />
                            <span>{room.hotel.address}</span>
                        </div>
                    </div>
                </div>
            ))}

            {/* Filters */}
            <div>
                
            </div>
        </div>
    )
}

export default AllRoom