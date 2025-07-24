import React from 'react'
import { useNavigate } from 'react-router-dom'
import Title from './Title'
import { roomsDummyData } from '../assets/assets'
import HotelCard from './HotelCard'

const FeaturedDestination = () => {

  const navigate = useNavigate()

  return (
    <div className='flex flex-col items-center px-6 py-20 md:px-16 lg:px-24 bg-slate-50'>
      
      <Title title='Featured Hotels' subTitle='Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences.' />

        <div className='flex items-center justify-center gap-6 mt-20 '>
            {roomsDummyData.slice(0, 4).map((room, index) => (
              <HotelCard key={room._id} room={room} index={index} />
            ))}
        </div>
        <button onClick={() => {navigate('/rooms'); scrollTo(0,0)}} className='px-4 py-2 my-16 text-sm font-medium text-gray-800 transition-all bg-white border border-gray-300 rounded cursor-pointer hover:bg-gray-50'>
          View All Destinations
        </button>
    </div>
  )
}

export default FeaturedDestination
