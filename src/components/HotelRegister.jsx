import React from 'react'
import { assets, cities } from '../assets/assets'

const HotelRegister = ({toggleHotelRegister}) => {
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center z-100 bg-black/70'>
        <form className='flex max-w-4xl bg-white rounded-xl max-md:mx-2'>
            <img src={assets.regImage} alt="register-img" className='hidden w-1/2 rounded-xl md:block'/>
            <div className='relative flex flex-col items-center p-8 md:w-1/2 md:p-10'>
              <img onClick={toggleHotelRegister} src={assets.closeIcon} alt="close-icon" className='absolute w-4 h-4 cursor-pointer top-4 right-4'/>
              <p className='mt-6 text-2xl font-semibold'>Register Your Hotel</p>

              {/* Hotel Name */}
              <div className='w-full mt-4'>
                <label htmlFor="name" className='font-medium text-gray-500'>Hotel Name</label>
                <input id='name' type="text" placeholder='Type here' className='w-full border border-gray-200 rounded px-3 py-2.5 mt-1 outline-indigo-500 font-light' required/>
              </div>
              {/* Phone Number */}
              <div className='w-full mt-4'>
                <label htmlFor="contact" className='font-medium text-gray-500'>Phone Number</label>
                <input id='contact' type="text" placeholder='Type here' className='w-full border border-gray-200 rounded px-3 py-2.5 mt-1 outline-indigo-500 font-light' required/>
              </div>
              {/* Address */}
              <div className='w-full mt-4'>
                <label htmlFor="address" className='font-medium text-gray-500'>Address</label>
                <input id='address' type="text" placeholder='Type here' className='w-full border border-gray-200 rounded px-3 py-2.5 mt-1 outline-indigo-500 font-light' required/>
              </div>
              {/* Select city drop down */}
              <div className='w-full mt-4 mr-auto max-w-60'>
                <label htmlFor="city" className='font-medium text-gray-500'>City</label>
                <select id="city" className='w-full px-3 border border-gray-200 rounded py-2.5 mt-1 outline-indigo-500 font-light' required>
                  <option value="">Select City</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                </select>
              </div>
              <button className='px-6 py-2 mt-6 mr-auto text-white transition-all bg-indigo-500 rounded cursor-pointer hover:bg-indigo-600'>Register</button>
            </div>
        </form>
    </div>
  )
}

export default HotelRegister
