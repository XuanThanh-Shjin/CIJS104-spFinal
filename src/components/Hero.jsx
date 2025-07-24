import React from 'react'



const Hero = () => {

  return (
    <div className='flex flex-col items-center justify-center px-6 text-white md:px-16 lg:px-24 xl:px-32 bg-[url("/src/assets/heroImage.png")] bg-no-repeat bg-cover bg-center h-screen'>
        <p className='bg-[#49b9ff]/50 px-3.5 py-1 rounded-full mt-14'>The Ultimate Hoetl Experience</p>
        <h1 className='font-[playfair] text-2xl md:text-5xl md:text-[43px] md:leading-[49px] font-bold md:font-extrabold max-w-5xl mt-4'>Discover Perfect Gateway Destination</h1>
        <p className='max-w-4xl mt-2 text-sm md:text-base text-zinc-200'>Offering elegance, comfort, and top-tier service, this hotel provides a refined experience for discerning travelers. With upscale rooms, fine dining, spa facilities, and personalized attention, every stay is designed to be exceptional and memorable.</p>     
    </div>
  )
}

export default Hero
