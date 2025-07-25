import React, { useState } from 'react';
import Title from '../../components/Title';
import { assets } from '../../assets/assets';

const AddRoom = () => {
    const initialRoomData = {
        roomType: '',
        pricePerNight: '',
        amenities: {
            'Free Wi-Fi': false,
            'Free Breakfast': false,
            'Room Service': false,
            'Mountain View': false,
            'Pool Access': false,
        },
    };

    const [images, setImages] = useState([null, null, null, null]);
    const [roomData, setRoomData] = useState(initialRoomData);
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState({ message: '', type: '' }); // For user feedback

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRoomData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setRoomData((prev) => ({
            ...prev,
            amenities: { ...prev.amenities, [name]: checked },
        }));
    };

    const handleImageChange = (e, index) => {
        const file = e.target.files[0];
        if (file) {
            const newImages = [...images];
            newImages[index] = file;
            setImages(newImages);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setFeedback({ message: '', type: '' }); // Reset feedback


        if (!roomData.roomType || !roomData.pricePerNight || images.every(img => img === null)) {
            setFeedback({ message: 'Please fill all fields and upload at least one image.', type: 'error' });
            setLoading(false);
            return;
        }

        let ownerHotelInfo = JSON.parse(localStorage.getItem('ownerHotelInfo'));
        if (!ownerHotelInfo) {

            ownerHotelInfo = {
                name: "My Default Hotel",
                location: "Default City",
                owner: "Default Owner"
            };
            localStorage.setItem('ownerHotelInfo', JSON.stringify(ownerHotelInfo));
        }

        const imagePromises = images
            .filter(img => img !== null)
            .map(file => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = error => reject(error);
                });
            });

        try {
            const imageUrls = await Promise.all(imagePromises);

            const selectedAmenities = Object.keys(roomData.amenities).filter(
                (amenity) => roomData.amenities[amenity]
            );

            const newRoom = {
                _id: `custom_${new Date().getTime()}`, 
                roomType: roomData.roomType,
                pricePerNight: Number(roomData.pricePerNight),
                amenities: selectedAmenities,
                images: imageUrls,
                hotel: ownerHotelInfo, 
            };

            const customRooms = JSON.parse(localStorage.getItem('customRooms')) || [];
            localStorage.setItem('customRooms', JSON.stringify([...customRooms, newRoom]));


            setFeedback({ message: 'Room added successfully!', type: 'success' });
            setRoomData(initialRoomData); 
            setImages([null, null, null, null]); 

            
            setTimeout(() => {
                setFeedback({ message: '', type: '' });
            }, 3000);

        } catch (error) {
            console.error("Failed to process images or save room:", error);
            setFeedback({ message: 'Failed to add room. Please try again.', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='pb-16'>
            <Title align='left' font='outfit' title='Add Room' subTitle='Fill in the details carefully and accurate room details, pricing, and amenities, to enhance the user booking experience.' />
            
            {feedback.message && (
                <div className={`p-4 mt-4 text-center rounded-md ${feedback.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {feedback.message}
                </div>
            )}

            <p className='mt-10 mb-2 text-gray-800'>Upload Images (at least 1)</p>
            <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
                {images.map((image, index) => (
                    <label htmlFor={`roomImage${index}`} key={index} className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer">
                        <img 
                            className='object-contain w-full h-full p-2 opacity-80' 
                            src={image ? URL.createObjectURL(image) : assets.uploadArea} 
                            alt={`Upload ${index + 1}`} 
                        />
                        <input type="file" accept='image/*' id={`roomImage${index}`} hidden onChange={e => handleImageChange(e, index)} />
                    </label>
                ))}
            </div>

            <div className='flex flex-col w-full mt-6 sm:flex-row sm:gap-8'>
                <div className='flex-1'>
                    <p className='text-gray-800'>Room Type</p>
                    <select name="roomType" className='w-full p-3 mt-1 border border-gray-300 rounded opacity-70' value={roomData.roomType} onChange={handleInputChange} required>
                        <option value="">Select Room Type</option>
                        <option value="Single Bed">Single Bed</option>
                        <option value="Double Bed">Double Bed</option>
                        <option value="Luxury Room">Luxury Room</option>
                        <option value="Family Suite">Family Suite</option>
                    </select>
                </div>
                <div className='mt-4 sm:mt-0'>
                    <p className='text-gray-800'>Price <span className='text-xs'>/ Night</span></p>
                    <input name="pricePerNight" type="number" placeholder='$100' className='w-full p-3 mt-1 border border-gray-300 rounded sm:w-32' value={roomData.pricePerNight} onChange={handleInputChange} required />
                </div>
            </div>
            
            <p className='mt-6 text-gray-800'>Amenities</p>
            <div className='grid grid-cols-2 gap-4 mt-2 sm:grid-cols-3'>
                {Object.keys(roomData.amenities).map((amenity, index) => (
                    <div key={index} className="flex items-center">
                        <input 
                            type="checkbox" 
                            id={`amenity-${index}`} 
                            name={amenity}
                            checked={roomData.amenities[amenity]} 
                            onChange={handleCheckboxChange}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor={`amenity-${index}`} className="ml-2 text-sm text-gray-700">{amenity}</label>
                    </div>
                ))}
            </div>

            <button type="submit" disabled={loading} className='px-8 py-3 mt-8 text-white bg-blue-500 rounded cursor-pointer disabled:bg-blue-300 hover:bg-blue-600'>
                {loading ? 'Adding...' : 'Add Room'}
            </button>
        </form>
    )
}

export default AddRoom;
