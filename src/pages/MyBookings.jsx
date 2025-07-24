import React, { useEffect, useState } from 'react';
// import emailjs from 'emailjs-com';
// import { useClerk } from '@clerk/clerk-react';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState('');
  // const { user } = useClerk();

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    setBookings(storedBookings);
  }, []);

  const sendEmail = (booking) => {
    const dashboardBookings = JSON.parse(localStorage.getItem('dashboardBookings')) || [];
    const updatedDashboardBookings = [...dashboardBookings, booking];
    localStorage.setItem('dashboardBookings', JSON.stringify(updatedDashboardBookings));

    // const updatedBookings = bookings.filter((_, i) => i !== index);
    // setBookings(updatedBookings);
    // localStorage.setItem('bookings', JSON.stringify(updatedBookings));

    setMessage('Booking confirmation sent to your email!');
    setTimeout(() => {
        setMessage('');
    }, 2000);



    // const templateParams = {
    //   to_name: user.fullName,
    //   to_email: user.primaryEmailAddress.emailAddress,
    //   hotel_name: booking.hotel.name,
    //   check_in: booking.checkIn,
    //   check_out: booking.checkOut,
    //   guests: booking.guests,
    // };

    // emailjs.send(
    //   'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
    //   'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
    //   templateParams,
    //   'YOUR_USER_ID' // Replace with your EmailJS user ID
    // )
    // .then((response) => {
    //   console.log('SUCCESS!', response.status, response.text);
    //   alert('Booking confirmation sent to your email!');
    // }, (err) => {
    //   console.log('FAILED...', err);
    //   alert('Failed to send booking confirmation.');
    // });
  };

  const handleCancel = (index) => {
    const updatedBookings = bookings.filter((_, i) => i !== index);
    setBookings(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    setMessage('Booking canceled successfully!');
    setTimeout(() => {
        setMessage('');
    }, 2000);
  }

  return (
    <div className="px-4 py-28 md:py-35 md:mx-16 lg:px-24 xl:px-32">
      <h1 className="mb-8 text-3xl md:text-4xl font-playfair">My Bookings</h1>
      {message && (
        <div className='fixed z-50 px-6 py-3 text-white transform -translate-x-1/2 bg-black rounded shadow-lg top-20 left-1/2 animate-fade'>
          {message}
        </div>
      )}
      {bookings.length > 0 ? (
        <div className="space-y-6">
          {bookings.map((booking, index) => (
            <div key={index} className="flex flex-col md:flex-row items-center justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl">
              <div className="flex items-center gap-6">
                <img src={booking.images[0]} alt={booking.hotel.name} className="object-cover w-32 h-32 rounded-lg" />
                <div>
                  <h2 className="text-xl font-playfair">{booking.hotel.name}</h2>
                  <p className="text-gray-500">{booking.hotel.address}</p>
                  <p className="text-gray-500">Check-in: {booking.checkIn}</p>
                  <p className="text-gray-500">Check-out: {booking.checkOut}</p>
                  <p className="text-gray-500">Guests: {booking.guests}</p>
                  {/* <p className="mt-2 text-lg font-semibold text-blue-500">Total: ${booking.totalPrice}</p> */}
                </div>
              </div>
              <div className='flex flex-col gap-4 max-md:w-full max-md:mt-6'>
                <button
                  onClick={() => sendEmail(booking, index)}
                  className="p-6 py-3 text-base text-white transition-all rounded-md cursor-pointer bg-blue-500/100 hover:bg-blue-600 active:scale-95 md:px-10 md:py-4"
                >
                  Booking Now
                </button>
                <button
                  onClick={() => handleCancel(index)}
                  className="p-6 py-3 text-base text-white transition-all bg-red-500 rounded-md cursor-pointer hover:bg-red-600 active:scale-95 md:px-10 md:py-4"
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>You have no bookings yet.</p>
      )}
    </div>
  );
};

export default MyBookings;
