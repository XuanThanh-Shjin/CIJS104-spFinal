import React, { useState, useEffect } from 'react';
import Title from '../../components/Title';
import { assets } from '../../assets/assets';

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [totalBookings, setTotalBookings] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const adminBookings = JSON.parse(localStorage.getItem('adminBookings')) || [];
    setBookings(adminBookings);

    // Calculate total bookings
    setTotalBookings(adminBookings.length);

    // Calculate total revenue
    const revenue = adminBookings.reduce((acc, booking) => acc + (booking.totalPrice || 0), 0);
    setTotalRevenue(revenue);
  }, []);

  return (
    <div>
      <Title align='left' font='outfit' title='Dashboard' subTitle='Monitor your room listings, track bookings and analyze revenue—all in one place. Stay updated with real-time insights to ensure smooth operations.' />
      <div className='flex gap-10 my-8'>
        {/* Total Bookings */}
        <div className='flex p-4 pr-8 border rounded bg-sky-50 border-sky-200/80'>
          <img src={assets.totalBookingIcon} alt="" className='h-10 max-sm:hidden' />
          <div className='flex flex-col font-medium sm:ml-4'>
            <p className='text-lg text-blue-500'>Total Bookings</p>
            <p className='text-base text-neutral-600'>{totalBookings}</p>
          </div>
        </div>
        {/* Total Revenue */}
        <div className='flex p-4 pr-8 border rounded bg-sky-50 border-sky-200/80'>
          <img src={assets.totalRevenueIcon} alt="" className='h-10 max-sm:hidden' />
          <div className='flex flex-col font-medium sm:ml-4'>
            <p className='text-lg text-blue-500'>Total Revenue</p>
            <p className='text-base text-neutral-500'> $ {totalRevenue.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <h2 className='mb-5 text-xl font-medium text-blue-950/70'>Recent Bookings</h2>
      <div className='w-full max-w-4xl overflow-y-auto text-left border border-gray-300 rounded-lg max-h-96'>
        <table className='w-full'>
          <thead className='sticky top-0 bg-gray-50'>
            <tr>
              <th className='px-4 py-3 font-medium text-gray-800'>User</th>
              <th className='px-4 py-3 font-medium text-gray-800 max-sm:hidden'>Room</th>
              <th className='px-4 py-3 font-medium text-center text-gray-800'>Amount</th>
              <th className='px-4 py-3 font-medium text-center text-gray-800'>Date</th>
              <th className='px-4 py-3 font-medium text-center text-gray-800'>Status</th>
            </tr>
          </thead>
          <tbody className='text-sm'>
            {bookings.length > 0 ? (
              bookings.map((item, index) => (
                <tr key={index} className="border-t border-gray-200">
                  <td className='px-4 py-3 text-gray-700'>
                    <div className="flex items-center">
                      <img src={item.user?.imageUrl || assets.userIcon} alt={item.user?.fullName || 'User'} className="w-8 h-8 mr-3 rounded-full" />
                      <div>
                        <p className="font-medium">{item.user?.fullName || 'N/A'}</p>
                        <p className="text-xs text-gray-500">{item.user?.primaryEmailAddress || 'No email'}</p>
                      </div>
                    </div>
                  </td>
                  <td className='px-4 py-3 text-gray-700 max-sm:hidden'>{item.roomType} at {item.hotel?.name || 'N/A'}</td>
                  <td className='px-4 py-3 text-center text-gray-700'>${(item.totalPrice || 0).toFixed(2)}</td>
                  <td className='px-4 py-3 text-center text-gray-700'>{new Date(item.paymentDate).toLocaleDateString()}</td>
                  <td className='px-4 py-3 text-center'>
                    <span className='px-3 py-1 text-xs text-green-700 bg-green-100 rounded-full'>Completed</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">No recent bookings found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Dashboard;
