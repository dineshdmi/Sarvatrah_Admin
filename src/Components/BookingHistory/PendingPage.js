import React from 'react';
import { useLocation } from 'react-router-dom';

const PendingPage = () => {
    const location = useLocation();
    const { state } = location;

    // Sample data for pending bookings
    const sampleBookings = [
        {
            id: 1,
            customerName: 'John Doe',
            packageName: 'Tropical Paradise',
            durationDays: 7,
            startDate: '2024-08-10',
            endDate: '2024-08-17',
            numberOfPeople: 2,
            numberOfRooms: 1,
            vehicle: 'SUV'
        },
        {
            id: 2,
            customerName: 'Jane Smith',
            packageName: 'Mountain Adventure',
            durationDays: 5,
            startDate: '2024-09-01',
            endDate: '2024-09-06',
            numberOfPeople: 4,
            numberOfRooms: 2,
            vehicle: 'Van'
        },
        {
            id: 3,
            customerName: 'Alice Johnson',
            packageName: 'City Lights Tour',
            durationDays: 3,
            startDate: '2024-10-15',
            endDate: '2024-10-18',
            numberOfPeople: 1,
            numberOfRooms: 1,
            vehicle: 'Sedan'
        }
    ];

    const bookings = state?.bookings || sampleBookings;

    return (
        <div className="container mx-auto mt-6">
            <h1 className="text-2xl font-bold mb-4">Pending Bookings</h1>
            <div className="overflow-x-auto p-4">
                <table className="min-w-full bg-white border border-gray-300 rounded-md overflow-hidden shadow-md">
                    <thead>
                        <tr className="bg-gray-200">
                            {/* Table headers */}
                            <th className="py-2 px-4 border-b border-gray-300">Sr. No.</th>
                            <th className="py-2 px-4 border-b border-gray-300">Customer Name</th>
                            <th className="py-2 px-4 border-b border-gray-300">Package Name</th>
                            <th className="py-2 px-4 border-b border-gray-300">Duration (Days)</th>
                            <th className="py-2 px-4 border-b border-gray-300">Start Date</th>
                            <th className="py-2 px-4 border-b border-gray-300">End Date</th>
                            <th className="py-2 px-4 border-b border-gray-300">No. of People</th>
                            <th className="py-2 px-4 border-b border-gray-300">No. of Rooms</th>
                            <th className="py-2 px-4 border-b border-gray-300">Vehicle</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking, index) => (
                            <tr key={booking.id} className={index % 2 === 0 ? 'bg-blue-100' : 'bg-white'}>
                                <td className="py-2 px-4 border-b border-gray-300">{index + 1}</td>
                                <td className="py-2 px-4 border-b border-gray-300">{booking.customerName}</td>
                                <td className="py-2 px-4 border-b border-gray-300">{booking.packageName}</td>
                                <td className="py-2 px-4 border-b border-gray-300">{booking.durationDays}</td>
                                <td className="py-2 px-4 border-b border-gray-300">{booking.startDate}</td>
                                <td className="py-2 px-4 border-b border-gray-300">{booking.endDate}</td>
                                <td className="py-2 px-4 border-b border-gray-300">{booking.numberOfPeople}</td>
                                <td className="py-2 px-4 border-b border-gray-300">{booking.numberOfRooms}</td>
                                <td className="py-2 px-4 border-b border-gray-300">{booking.vehicle}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PendingPage;

