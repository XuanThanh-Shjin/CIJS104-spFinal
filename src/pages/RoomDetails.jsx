import React, { useEffect,useState } from 'react'
import { assets, facilityIcons, roomCommonData, roomsDummyData } from '../assets/assets'
import { useNavigate, useParams } from 'react-router-dom'
import StarRating from '../components/StarRating'
import { useClerk } from '@clerk/clerk-react'

const RoomDetails = () => {
    const {id} = useParams()
    const [room, setRoom] = useState({ images: [], amenities: [] });
    const [mainImage, setMainImage] = useState(null)
    const [booking, setBooking] = useState({
        checkIn: '',
        checkOut: '',
        guests: 1,
    })
    const [isAvailable, setIsAvailable] = useState(false)
    const [showNotification, setShowNotification] = useState(false)
    const [totalPrice, setTotalPrice] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
       const customRooms = JSON.parse(localStorage.getItem('customRooms')) || [];
       const combinedRooms = [...roomsDummyData, ...customRooms];
       const room = combinedRooms.find(room => room._id === id);
       
       if (room) {
           setRoom(room);
           setMainImage(room.images[0]);
       }
    },[id])

    useEffect(() => {
        if (booking.checkIn && booking.checkOut && room.pricePerNight) {
            const checkInDate = new Date(booking.checkIn);
            const checkOutDate = new Date(booking.checkOut);
            const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
            const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
            if (nights > 0) {
                setTotalPrice(room.pricePerNight * nights * booking.guests);
            } else {
                setTotalPrice(0);
            }
        }
    }, [booking, room.pricePerNight]);

    const {openSignIn, user} = useClerk();

    const handleBooking = (e) => {
        e.preventDefault();
        if (!isAvailable) {
            setShowNotification(true);
            setIsAvailable(true);
            setTimeout(() => {
                setShowNotification(false);
            }, 3000);
            return;
        }

        if (!user) {
            openSignIn()
            return
        }
        const newBooking = {
            ...room,
            ...booking,
            totalPrice: totalPrice,
            user: {
                fullName: user.fullName,
                primaryEmailAddress: user.primaryEmailAddress.emailAddress,
                imageUrl: user.imageUrl,
            }
        }
        const bookings = JSON.parse(localStorage.getItem('bookings')) || []
        localStorage.setItem('bookings', JSON.stringify([...bookings, newBooking]))
        navigate('/my-bookings')
    }

  return room && (
    <>
    {showNotification && (
        <div className="fixed z-50 px-4 py-2 text-white bg-green-500 rounded-lg shadow-lg top-20 right-[45%]">
            Room is Available
        </div>
    )}
    <div className='px-4 py-28 md:py-35 md:mx-16 lg:px-24 xl:px-32'>
        <div className='flex flex-col items-start gap-2 md:flex-row md:items-center'>
            <h1 className='text-3xl md:text-4xl font-playfair'>
                {room.hotel?.name} <span className='text-sm font-inter'>({room?.roomType})</span></h1>
            <p className='text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full'>20% OFF</p>
        </div>
        <div className='flex items-center gap-1 mt-2'>
            <StarRating />
            <p className='ml-2'>200+ reviews</p>
        </div>
        <div className='flex items-center gap-1 mt-2 text-gray-500'>
            <img src={assets.locationIcon} alt="location-icon" />
            <span>{room.hotel?.address}</span>
        </div>
        <div className='flex flex-col gap-6 mt-6 lg:flex-row'>
            <div className='w-full lg:w-1/2'>
                <img src={mainImage} alt="Room Image" className='object-cover w-full shadow-lg rounded-xl' />
            </div>
            <div className='grid w-full grid-cols-2 gap-4 lg:w-1/2'>
                {room?.images.length > 1 && room.images.map((image, index)=>(
                    <img onClick={()=> setMainImage(image)} 
                key={index} src={image} alt="Room Image" className={`w-full rounded-xl shadow-md object-cover cursor-pointer ${mainImage === image && 'outline-3 outline-orange-500'}`}/>
            ))}
            </div>
        </div>
        <div className='flex flex-col mt-10 md:flex-row md:justify-between'>
            <div className='flex flex-col'>
                <h1 className='text-3xl md:text-4xl font-playfair'>
                    Experience Luxury Like Never Before
                </h1>
                <div className='flex flex-wrap items-center gap-4 mt-3 mb-6'>
                    {room.amenities.map((item, index)=>(
                        <div key={index} className='flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg'>
                            <img src={facilityIcons[item]} alt={item} className='w-5 h-5' />
                            <p className='text-xs'>{item}</p>
                        </div>
                    ))}
                </div>
            </div>
            <p className='text-2xl font-medium'>${room.pricePerNight}/night</p>
        </div>
        <form onSubmit={handleBooking} className='flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl'>
            <div className='flex flex-col flex-wrap items-start gap-4 text-gray-500 md:flex-row md:items-center md:gap-10'>
                    <div className='flex flex-col'>
                        <label htmlFor="checkInDate" className='font-medium'>Check-In</label>
                        <input onChange={(e) => setBooking({...booking, checkIn: e.target.value})} value={booking.checkIn} type="date" id='checkInDate' placeholder='Check-In' className='w-48 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />
                    </div>
                    <div className='w-px bg-gray-500 h-15 max-md:hidden'></div>
                    <div className='flex flex-col'>
                        <label htmlFor="checkOutDate" className='font-medium'>Check-Out</label>
                        <input onChange={(e) => setBooking({...booking, checkOut: e.target.value})} value={booking.checkOut} type="date" id='checkOutDate' placeholder='Check-Out' className='w-48 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />
                    </div>
                    <div className='w-px bg-gray-500 h-15 max-md:hidden'></div>
                    <div className='flex flex-col'>
                        <label htmlFor="guests" className='font-medium'>Guests</label>
                        <input onChange={(e) => setBooking({...booking, guests: e.target.value})} value={booking.guests} type="number" id='guests' placeholder='0' className='max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />
                    </div>
            </div>

            <button  type='submit' className='p-6 py-3 text-base text-white transition-all rounded-md cursor-pointer bg-blue-500/100 hover:bg-blue-600 active:scale-95 max-md:w-full max-md:mt-6 md:px-25 md:py-4'>
                {isAvailable ? 'Book Now' : 'Check Availability'}
            </button>
        </form>

        <div className='space-y-4 mt-28'>
            {roomCommonData.map((spec, index)=>(
                <div key={index} className='flex items-start gap-2'>
                    <img src={spec.icon} alt={`${spec.title}-icon`} className='w-7'/>
                    <div>
                        <p className='text-base'>{spec.title}</p>
                        <p className='text-gray-500'>{spec.description}</p>
                    </div>
                </div>
            ))}
        </div>

        <div className='max-w-3xl border-y border-gray-300 my-1.5 py-10 text-gray-500'>
            <p>Guests will be allocated on the ground floor according to availability. You get a comfortable Two bedroom apartment has a true city feeling. The price quoted is for two guest, at the guest slot please mark the number of guests to get the extract price for groups. The Guests will be allocated ground floor according to availability. You get the comfortable two bedroom apartment that has a true city feeling.</p>
        </div>
        
        <div className='flex flex-col items-start gap-4 mt-12'>
            <div className='flex gap-4'>
                <img src={room.hotel?.owner?.image} alt="Host" className='rounded-full h-14 w-14 md:h-20 md:w-20' />
                <div>
                    <p className='text-lg md:text-xl'>Hosted by {room.hotel?.name}</p>
                    <div className='flex items-center mt-1'>
                        <StarRating />
                        <p className='ml-2'>200+ reviews</p>
                    </div>
                </div>
            </div>
            <button className='px-6 py-2.5 mt-4 rounded text-white bg-blue-500/100 hover:bg-blue-600 transition-all cursor-pointer'>Contact Now</button>
        </div>
    </div>
    </>
    )
}

export default RoomDetails
