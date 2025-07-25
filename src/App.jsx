import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home';
import AllRooms from './pages/AllRooms';
import RoomDetails from './pages/RoomDetails';
import Footer from './components/Footer';
import Nav from './components/Navbar';
import MyBookings from './pages/MyBookings';
import HotelRegister from './components/HotelRegister';
import Layout from './pages/HotelOwner/Layout';
import AddRoom from './pages/HotelOwner/AddRoom';
import Dashboard from './pages/HotelOwner/Dashboard';
import ListRoom from './pages/HotelOwner/ListRoom';
import Experience from './pages/Experience';
import About from './pages/About';

const App = () => {

  const isOwnerPath = useLocation().pathname.includes('owner');
  // const [isHotelRegisterOpen, setIsHotelRegisterOpen] = useState(false);

  // const toggleHotelRegister = () => {
  //   setIsHotelRegisterOpen(!isHotelRegisterOpen);
  // }

  return (
    <div>
      {!isOwnerPath && <Nav />}
      {false && <HotelRegister />}
      <div className='min-h-[70vh]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/rooms' element={<AllRooms />} />
          <Route path='/rooms/:id' element={<RoomDetails />} />
          <Route path='/my-bookings' element={<MyBookings />} />
          <Route path='/experience' element={<Experience />} />
          <Route path='/about' element={<About />} />
          <Route path='/owner' element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path='add-room' element={<AddRoom />} />
            <Route path='list-room' element={<ListRoom />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
