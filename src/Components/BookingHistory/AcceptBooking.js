// src/components/AcceptedBookings.js

import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';

const AcceptedBookings = () => {
  const { state } = useLocation();
  const acceptedBookings = state?.acceptedBookings || [];

  return (
    <div className="mr-6 ml-3 shadow-lg h-full w-11/12 bg-white">
      <div className="container mx-auto mt-6">
        <h1 className="text-2xl font-bold mb-4 border-b-2 border-b-gray-100 p-7 border-l-8 border-l-blue-400">
          Accepted Bookings
        </h1>
        <div className="overflow-x-auto p-4">
          <table className="min-w-full bg-white border border-gray-300 rounded-md overflow-hidden shadow-md">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border-b border-gray-300 border-l border-r">Sr. No.</th>
                <th className="py-2 px-4 border-b border-gray-300 border-r">Customer Name</th>
                <th className="py-2 px-4 border-b border-gray-300 border-r">Package Name</th>
                <th className="py-2 px-4 border-b border-gray-300 border-r">Duration (Days)</th>
                <th className="py-2 px-4 border-b border-gray-300 border-r">Start Date</th>
                <th className="py-2 px-4 border-b border-gray-300 border-r">End Date</th>
                <th className="py-2 px-4 border-b border-gray-300 border-r">No. of People</th>
                <th className="py-2 px-4 border-b border-gray-300 border-r">No. of Rooms</th>
                <th className="py-2 px-4 border-b border-gray-300 border-r">Vehicle</th>
                <th className="py-2 px-4 border-b border-gray-300 border-r">Status</th>
                <th className="py-2 px-4 border-b border-gray-300 border-r">Actions</th>
              </tr>
            </thead>
            <tbody>
              {acceptedBookings.map((booking, index) => (
                <tr key={booking.id} className={index % 2 === 0 ? 'bg-blue-100' : 'bg-white'}>
                  <td className="py-2 px-4 border-b border-gray-300 border-l border-r">{index + 1}</td>
                  <td className="py-2 px-4 border-b border-gray-300 border-r">{booking.customerName}</td>
                  <td className="py-2 px-4 border-b border-gray-300 border-r">{booking.packageName}</td>
                  <td className="py-2 px-4 border-b border-gray-300 border-r">{booking.durationDays}</td>
                  <td className="py-2 px-4 border-b border-gray-300 border-r">{booking.startDate}</td>
                  <td className="py-2 px-4 border-b border-gray-300 border-r">{booking.endDate}</td>
                  <td className="py-2 px-4 border-b border-gray-300 border-r">{booking.numberOfPeople}</td>
                  <td className="py-2 px-4 border-b border-gray-300 border-r">{booking.numberOfRooms}</td>
                  <td className="py-2 px-4 border-b border-gray-300 border-r">{booking.vehicle}</td>
                  <td className="py-2 px-4 border-b border-gray-300 text-center border-r">
                    <button className="py-1 px-3 bg-green-500 text-white rounded">
                      Accepted
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AcceptedBookings;
