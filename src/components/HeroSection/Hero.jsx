import React from 'react'
import { assets, cities } from '../../assets/assets'

const Hero = () => {
  return (
    <div className='flex flex-col items-center justify-center px-6 text-white md:px-16 lg:px-24 xl:px-32 bg-[url("/src/assets/heroImage.png")] bg-no-repeat bg-cover bg-center h-screen'>
        <p className='bg-[#49b9ff]/50 px-3.5 py-1 rounded-full mt-14'>The Ultimate Hoetl Experience</p>
        <h1 className='font-[playfair] text-2xl md:text-5xl md:text-[43px] md:leading-[49px] font-bold md:font-extrabold max-w-5xl mt-4'>Discover Perfect Gateway Destination</h1>
        <p className='max-w-4xl mt-2 text-sm md:text-base text-zinc-200'>Offering elegance, comfort, and top-tier service, this hotel provides a refined experience for discerning travelers. With upscale rooms, fine dining, spa facilities, and personalized attention, every stay is designed to be exceptional and memorable.</p>
        <form className='flex flex-col gap-4 px-6 py-4 mt-12 text-gray-500 bg-white rounded-lg md:flex-row max-md:items-start max-md:mx-auto'>
            <div>
                <div className='flex items-center gap-2'>
                    <img src={assets.calenderIcon} alt="" className='h-4'/>
                    <label htmlFor="destinationInput">Destination</label>
                </div>
                <input list='destinations' id="destinationInput" type="text" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" placeholder="Type here" required />
                <datalist id='destinations'>
                    {cities.map((city, index) => (
                        <option value={city} key={index} />
                    ))}
                </datalist>
            </div>

            <div>
                <div className='flex items-center gap-2'>
                    <img src={assets.calenderIcon} alt="" className='h-4'/>
                    <label htmlFor="checkIn">Check in</label>
                </div>
                <input id="checkIn" type="date" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" />
            </div>

            <div>
                <div className='flex items-center gap-2'>
                    <img src={assets.calenderIcon} alt="" className='h-4'/>
                    <label htmlFor="checkOut">Check out</label>
                </div>
                <input id="checkOut" type="date" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" />
            </div>

            <div className='flex md:flex-col max-md:gap-2 max-md:items-center'>
                <label htmlFor="guests">Guests</label>
                <input min={1} max={4} id="guests" type="number" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none  max-w-16" placeholder="0" />
            </div>

            <button className='flex items-center justify-center gap-1 px-4 py-3 my-auto text-white bg-black rounded-md cursor-pointer max-md:w-full max-md:py-1' >
            <img src={assets.searchIcon} alt="searchIcon" className='h-7' />
                <span>Search</span>
            </button>
        </form>
    </div>
  )
}

export default Hero