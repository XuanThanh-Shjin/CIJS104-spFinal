import React from 'react'
import Nav from './components/Nav/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home';
import AllRoom from './pages/AllRoom';

const App = () => {

  const isOwnerPath = useLocation().pathname.includes('owner');


  return (
    <div>
      {!isOwnerPath && <Nav />}
      <div className='min-h-[70vh]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/room' element={<AllRoom />} />
        </Routes>
      </div>
    </div>
  )
}

export default App