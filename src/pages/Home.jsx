import React from 'react'
import Hero from '../components/HeroSection/Hero'
import FeaturedDestination from '../components/Featured/FeaturedDestination'
import ExclusiveOffers from '../components/Offer/ExclusiveOffers'
import Testimonial from '../components/Testimonial/Testimonial'
import NewLetter from '../components/NewLetter/NewLetter'
import Footer from '../components/Footer/Footer'
import AllRoom from './AllRoom'

const Home = () => {
  return (
    <>
        <Hero />

        <FeaturedDestination />

        <ExclusiveOffers />

        <Testimonial />

        <NewLetter />

        <Footer />
    </>
  )
}

export default Home