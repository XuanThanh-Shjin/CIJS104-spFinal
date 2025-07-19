import React from 'react'
import Nav from './components/Nav/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home';
import AllRooms from './pages/AllRooms';
import RoomDetails from './pages/RoomDetails';
import Footer from './components/Footer/Footer';

const App = () => {

  const isOwnerPath = useLocation().pathname.includes('owner');


  return (
    <div>
      {!isOwnerPath && <Nav />}
      <div className='min-h-[70vh]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/rooms' element={<AllRooms />} />
          <Route path='/rooms/:id' element={<RoomDetails />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App