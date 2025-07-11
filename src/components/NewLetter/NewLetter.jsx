import React from 'react'
import { assets } from '../../assets/assets'
import Title from '../Title/Title'

const NewLetter = () => {
  return (
    <div className="flex flex-col items-center w-full px-4 py-12 mx-2 text-white bg-gray-900 lg:w-full md:py-16 lg:mx-auto my-30">
        <Title title="Stay Inspired" subTitle="Join our newsletter and be the first to discover new destinations, exclusive offers, and travel inspiration." />
        <div className="flex flex-col items-center justify-center gap-4 mt-6 md:flex-row">
            <input type="text" className="bg-white/10 px-4 py-2.5 border border-white/20 rounded outline-none max-w-66 w-full" placeholder="Enter your email" />
            <button className="flex items-center justify-center gap-2 group bg-black px-4 md:px-7 py-2.5 rounded active:scale-95 transition-all">Subscribe
                <img src={assets.arrowIcon} alt="arrow-icon" className='w-3.5 invert group-hover:translate-x-1 transition-all'/>
            </button>
        </div>
        <p className="mt-6 text-xs text-center text-gray-500">By subscribing, you agree to our Privacy Policy and consent to receive updates.</p>
    </div>
  )
}

export default NewLetter