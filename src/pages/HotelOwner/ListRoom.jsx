import React, { useState, useEffect } from 'react';
import Title from '../../components/Title';
import { roomsDummyData } from '../../assets/assets';
import { FaTrash } from 'react-icons/fa'; // Using react-icons for the delete icon

const ListRoom = () => {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        
        const customRooms = JSON.parse(localStorage.getItem('customRooms')) || [];

        setRooms([...roomsDummyData, ...customRooms]);
    }, []);

    // const handleRemoveRoom = (roomId) => {
    //     // Filter out the room to be removed
    //     const updatedRooms = rooms.filter(room => room._id !== roomId);
    //     setRooms(updatedRooms);

    //     // Update localStorage for custom rooms
    //     const customRooms = JSON.parse(localStorage.getItem('customRooms')) || [];
    //     const updatedCustomRooms = customRooms.filter(room => room._id !== roomId);
    //     localStorage.setItem('customRooms', JSON.stringify(updatedCustomRooms));
    // };

    return (
        <div className='pb-16'>
            <Title align='left' font='outfit' title='List Room' subTitle='View, edit, or manage all listed rooms. Keep the information up-to-date to provide the best experience for users.' />
            <p className='mt-8 text-gray-500'>All Rooms ({rooms.length})</p>
                <div className='w-full max-w-4xl mt-3 overflow-x-auto text-left border border-gray-300 rounded-lg'>
                    <table className='w-full'>
                        <thead className='bg-gray-50'>
                            <tr>
                                <th className='px-4 py-3 font-medium text-gray-800'>Room Type</th>
                                <th className='px-4 py-3 font-medium text-gray-800 max-sm:hidden'>Amenities</th>
                                <th className='px-4 py-3 font-medium text-gray-800'>Price/Night</th>
                            </tr>
                        </thead>
                        <tbody className='text-sm'>
                            {rooms.map((item) => (
                                <tr key={item._id} className='border-t border-gray-200'>
                                    <td className='px-4 py-3 text-gray-600'>{item.roomType}</td>
                                    <td className='px-4 py-3 text-gray-500 max-sm:hidden'>{item.amenities.join(', ')}</td>
                                    <td className='px-4 py-3 pl-10 font-medium text-gray-700'>${item.pricePerNight}</td>
                                    {/* <td className='px-4 py-3 text-center'></td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
        </div>
    );
}

export default ListRoom;
