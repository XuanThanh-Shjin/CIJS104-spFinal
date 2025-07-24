import React, { useState } from 'react'
import { assets, facilityIcons, roomsDummyData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import StarRating from '../components/StarRating'


const CheckBox = ({label, selected = false, onChange = () => { }}) => {
    return (
        <label className="flex items-center gap-3 mt-2 text-sm cursor-pointer" htmlFor="">
            <input type="checkbox" checked={selected} onChange = {(e)=>onChange(e.target.checked, label)} />
            <span className='font-light select-none'>{label}</span>
        </label>
    )
}

const RadioButton = ({label, selected = false, onChange = () => { }}) => {
    return (
        <label className="flex items-center gap-3 mt-2 text-sm cursor-pointer" htmlFor="">
            <input type="radio" name="sortOption" checked={selected} onChange = {()=>onChange(label)} />
            <span className='font-light select-none'>{label}</span>
        </label>
    )
}

const AllRooms = () => {
    const navigate = useNavigate();
    const [openFilters, setOpenFilters] = useState(false)
    const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);
    const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
    const [selectedSortOption, setSelectedSortOption] = useState('');

    const handleRoomTypeChange = (checked, label) => {
        if (checked) {
            setSelectedRoomTypes([...selectedRoomTypes, label]);
        } else {
            setSelectedRoomTypes(selectedRoomTypes.filter((type) => type !== label));
        }
    };

    const handlePriceRangeChange = (checked, label) => {
        const formattedLabel = label.replace('$ ', '');
        if (checked) {
            setSelectedPriceRanges([...selectedPriceRanges, formattedLabel]);
        } else {
            setSelectedPriceRanges(selectedPriceRanges.filter((range) => range !== formattedLabel));
        }
    };

    const handleSortChange = (label) => {
        setSelectedSortOption(label);
    };

    const clearFilters = () => {
        setSelectedRoomTypes([]);
        setSelectedPriceRanges([]);
        setSelectedSortOption('');
    };

    const filteredAndSortedRooms = roomsDummyData
        .filter(room => {
            if (selectedRoomTypes.length === 0) return true;
            return selectedRoomTypes.includes(room.roomType);
        })
        .filter(room => {
            if (selectedPriceRanges.length === 0) return true;
            return selectedPriceRanges.some(range => {
                const [min, max] = range.split(' to ').map(Number);
                return room.pricePerNight >= min && room.pricePerNight <= max;
            });
        })
        .sort((a, b) => {
            if (selectedSortOption === 'Price Low to High') {
                return a.pricePerNight - b.pricePerNight;
            }
            if (selectedSortOption === 'Price High to Low') {
                return b.pricePerNight - a.pricePerNight;
            }
            return 0;
        });

    const roomTypes = [
        "Single Bed",
        "Double Bed",
        "Luxury Room",
        "Family Suite",
    ];
    const priceRanges = [
        '0 to 500',
        '500 to 1000',
        '1000 to 2000',
        '2000 to 3000',
    ];
    const sortOptions = [
        "Price Low to High",
        "Price High to Low",
        "Newest First"
    ];
    return (
        <div className='flex-row-reverse items-center justify-between px-4 lg:flex-row pt-28 md:pt-32 md:px-16 lg:px-24 xl:px-32'>
            <div className='flex flex-col items-start text-left'>
                <h1 className='font-[playfair] text-4xl md:text-[40px]'>Hotel Rooms</h1>
                <p className='max-w-2xl mt-2 text-sm md:text-base text-gray-500/90'>Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories.</p>
            </div>

            <div className='flex justify-between'>
                <div className='w-full lg:w-2/3'>
                {filteredAndSortedRooms.map((room) => (
                    <div key={room._id} className='flex my-4'>
                        <img onClick={() => {navigate(`/rooms/${room._id}`); scrollTo(0, 0)}}
                        src={room.images[0]} alt="hotel-img" title='View Room Details' className='object-cover shadow-lg cursor-pointer max-h-64 md:w-2/5 rounded-xl' />
                        <div className='flex flex-col gap-2 mx-4 md:w-1/2'>
                            <p className='text-gray-500'>{room.hotel.city}</p>
                            <p onClick={() => {navigate(`/rooms/${room._id}`); scrollTo(0, 0)}} className='text-3xl text-gray-800 font-[playfair] cursor-pointer'>{room.hotel.name}</p>
                            <div className='flex items-center'>
                                <StarRating />
                                <p className='ml-2'>260+ reviews</p>
                            </div>
                            <div className='flex items-center gap-1 mt-1 text-sm text-gray-500'>
                                <img src={assets.locationIcon} alt="location-icon" />
                                <span>{room.hotel.address}</span>
                            </div>  
                            <div className='flex flex-wrap items-center gap-4 mt-3 mb-6'>
                                {room.amenities.map((item, index) => (
                                    <div key={index} className='flex items-center gap-2 px-3 py-2 rounded-lg bg-[#f5f5ff]/70'>
                                        <img src={facilityIcons[item]} alt={item} className='w-5 h-5' />
                                        <p className='text-xs'>{item}</p>
                                    </div>
                                ))}
                            </div>
                            <p className='text-xl font-medium text-grey-700'>${room.pricePerNight} /night</p>
                        </div>
                    </div>
                ))}
                </div>
                <div className='text-gray-600 bg-white border border-gray-300 w-80 max-lg:mb-8 h-fit'>
                    <div className={`flex items-center justify-between px-5 py-2.5 min-lg:border-b border-gray-300 ${openFilters && "border-b"}`}>
                        <p className='text-base font-medium text-gray-800'>FILTERS</p>
                        <div className='text-xs cursor-pointer'>
                            <span onClick={()=> setOpenFilters(!openFilters)} 
                            className='lg:hidden'>
                                {openFilters ? 'HIDE' : 'SHOW'}</span>
                            <span onClick={clearFilters} className='hidden lg:block'>CLEAR</span>
                        </div>
                    </div>
                    <div className={`${openFilters ? 'h-auto' : "h-0 lg:h-auto"} overflow-hidden transition-all duration-700`}>
                        <div className='px-5 pt-5'>
                            <p className='pb-2 font-medium text-gray-800'>Popular Filters</p>
                            {roomTypes.map((room, index)=>(
                                <CheckBox key={index} label={room} selected={selectedRoomTypes.includes(room)} onChange={handleRoomTypeChange}/>
                            ))}
                        </div>
                        <div className='px-5 pt-5'>
                            <p className='pb-2 font-medium text-gray-800'>Price Range</p>
                            {priceRanges.map((range, index)=>(
                                <CheckBox key={index} label={`$ ${range}`} selected={selectedPriceRanges.includes(range)} onChange={handlePriceRangeChange}/>
                            ))}
                        </div>
                        <div className='px-5 pt-5 pb-7'>
                            <p className='pb-2 font-medium text-gray-800'>Sort By</p>
                            {sortOptions.map((option, index)=>(
                                <RadioButton key={index} label={option} selected={selectedSortOption === option} onChange={handleSortChange}/> 
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    )
}

export default AllRooms
