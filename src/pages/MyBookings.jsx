import React, { useEffect, useState } from 'react'
import emailjs from '@emailjs/browser';
import { assets } from '../assets/assets'
import Title from '../components/Title'
import PaymentModal from '../components/PaymentModal'

const MyBookings = () => {

  const [bookings, setBookings] = useState([])
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState(null)

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    setBookings(storedBookings);
  }, []);

  const handlePayNowClick = (booking) => {
    setSelectedBooking(booking);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = (paidBooking) => {
    const updatedBookings = bookings.map(booking =>
      booking._id === paidBooking._id ? { ...booking, isPaid: true } : booking
    );
    setBookings(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));

    // Save to admin dashboard data
    const adminBookings = JSON.parse(localStorage.getItem('adminBookings')) || [];
    const paidBookingWithDate = { ...paidBooking, isPaid: true, paymentDate: new Date().toISOString() };
    localStorage.setItem('adminBookings', JSON.stringify([...adminBookings, paidBookingWithDate]));

    // Send email confirmation
    const templateParams = {
      user_name: paidBooking.user.fullName,
      user_email: paidBooking.user.primaryEmailAddress,
      booking_id: paidBooking._id,
      hotel_name: paidBooking.hotel.name,
      location: paidBooking.hotel.address,
      check_in: new Date(paidBooking.checkIn).toDateString(),
      total_price: paidBooking.totalPrice,
    };

    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      templateParams,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
    .then((response) => {
       console.log('SUCCESS!', response.status, response.text);
       alert('Payment successful! A confirmation email has been sent.');
    }, (err) => {
       console.log('FAILED...', err);
       alert('Payment successful, but we failed to send a confirmation email. Please contact support.');
    });

    setShowPaymentModal(false);
  };

  // const handleReset = () => {
  //   localStorage.removeItem('bookings');
  //   setBookings([]);
  // }

  return (
    <div className='px-4 py-28 md:pb-24 md:pt-32 md:px-16 lg:px-24 xl:px-32'>
      <div className='flex items-center justify-between'>
        <Title title='My Bookings' subTitle='Easily manage your past, current, and upcoming hotel reservations in one place. Plan your trips seamlessly with just a few clicks' align='left' />
        {/* <button onClick={handleReset} className='px-4 py-2 text-sm text-white bg-red-500 rounded-md hover:bg-red-600'>Reset Bookings</button> */}
      </div>
      <div className='w-full max-w-6xl mt-8 text-gray-800'>
        {bookings.length > 0 ? (
          <>
            <div className='hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 py-3 font-medium text-base'>
              <div className='w-1/3'>Hotels</div>
              <div className='w-1/3'>Date & Timings</div>
              <div className='w-1/3'>Payment</div>
            </div>
            {bookings.map((booking) => (
              <div key={booking._id} className='grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 py-6 first:border-t'>
                {/* Hotel Details */}
                <div className='flex flex-col md:flex-row'>
                  <img src={booking.images[0]} alt="hotel-img" className='object-cover w-20 rounded shadow md:min-w-44' />
                  <div className='flex flex-col gap-1.5 max-md:mt-4 md:ml-6'>
                    <p className='font-[playfair] text-2xl'>{booking.hotel.name}
                      <span className='text-sm font-inter'> ({booking.roomType})</span>
                    </p>
                    <div className='flex items-center gap-1 text-sm text-gray-500'>
                      <img src={assets.locationIcon} alt="location-icon" />
                      <span>{booking.hotel.address}</span>
                    </div>
                    <div className='flex items-center gap-1 text-sm text-gray-500'>
                      <img src={assets.guestsIcon} alt="location-icon" />
                      <span>Guests: {booking.guests}</span>
                    </div>
                    <p className='text-base'>Total: ${booking.totalPrice}</p>
                  </div>
                </div>
                {/* Date & Timings */}
                <div className='flex flex-row gap-8 md:items-center md:gap-12'>
                  <div>
                    <p>Check-In:</p>
                    <p className='text-sm text-gray-600'>{new Date(booking.checkIn).toDateString()}</p>
                  </div>
                  <div>
                    <p>Check-Out:</p>
                    <p className='text-sm text-gray-600'>{new Date(booking.checkOut).toDateString()}</p>
                  </div>
                </div>
                {/* Payment */}
                <div className='flex flex-col items-center justify-center pt-3'>
                  <div className='flex items-center gap-2'>
                    <div className={`h-3 w-3 rounded-full ${booking.isPaid ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <p className={`text-sm ${booking.isPaid ? 'text-green-500' : 'text-red-500'}`}>{booking.isPaid ? 'Paid' : 'Unpaid'}</p>
                  </div>
                  {!booking.isPaid && (
                    <button onClick={() => handlePayNowClick(booking)} className='px-4 py-1.5 mt-4 text-xs border border-gray-400 rounded-full hover:bg-gray-50 transition-all cursor-pointer'>Pay Now</button>
                  )}
                </div>
              </div>
            ))}
          </>
        ) : (
          <p className='mt-8 text-center text-gray-500'>You have no bookings yet.</p>
        )}
      </div>
      {showPaymentModal && (
        <PaymentModal
          booking={selectedBooking}
          onClose={() => setShowPaymentModal(false)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  )
}

export default MyBookings
