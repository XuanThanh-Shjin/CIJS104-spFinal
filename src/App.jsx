import React, { useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home';
import AllRooms from './pages/AllRooms';
import RoomDetails from './pages/RoomDetails';
import Footer from './components/Footer';
import Nav from './components/Navbar';
import MyBookings from './pages/MyBookings';
import HotelRegister from './components/HotelRegister';

const App = () => {

  const isOwnerPath = useLocation().pathname.includes('owner');
  const [isHotelRegisterOpen, setIsHotelRegisterOpen] = useState(false);

  const toggleHotelRegister = () => {
    setIsHotelRegisterOpen(!isHotelRegisterOpen);
  }

  return (
    <div>
      {!isOwnerPath && <Nav toggleHotelRegister={toggleHotelRegister} />}
      {isHotelRegisterOpen && <HotelRegister toggleHotelRegister={toggleHotelRegister} />}
      <div className='min-h-[70vh]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/rooms' element={<AllRooms />} />
          <Route path='/rooms/:id' element={<RoomDetails toggleHotelRegister={toggleHotelRegister} />} />
          <Route path='/my-bookings' element={<MyBookings />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
