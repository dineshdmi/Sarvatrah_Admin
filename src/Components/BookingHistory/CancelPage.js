import React from 'react';
import { useLocation } from 'react-router-dom';

const CancelPage = () => {
  const location = useLocation();
  const { deletedBooking } = location.state || {};

  if (!deletedBooking) {
    return <div>No data available</div>;
  }

  return (
    <div className="container mx-auto mt-6 p-6">
      <h1 className="text-2xl font-bold mb-4">Cancelled Booking Details</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <table className="w-full text-left border-collapse">
          <thead className="bg-blue-500 text-black">
            <tr>
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
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr className="bg-blue-100">
              <td className="py-2 px-4 border-b border-gray-300 border-l border-r">1</td>
              <td className="py-2 px-4 border-b border-gray-300 border-l border-r">{deletedBooking.customerName}</td>
              <td className="py-2 px-4 border-b border-gray-300 border-r">{deletedBooking.packageName}</td>
              <td className="py-2 px-4 border-b border-gray-300 border-r">{deletedBooking.durationDays}</td>
              <td className="py-2 px-4 border-b border-gray-300 border-r">{deletedBooking.startDate}</td>
              <td className="py-2 px-4 border-b border-gray-300 border-r">{deletedBooking.endDate}</td>
              <td className="py-2 px-4 border-b border-gray-300 border-r">{deletedBooking.numberOfPeople}</td>
              <td className="py-2 px-4 border-b border-gray-300 border-r">{deletedBooking.numberOfRooms}</td>
              <td className="py-2 px-4 border-b border-gray-300 border-r">{deletedBooking.vehicle}</td>
              <td className="py-2 px-4 border-b border-gray-300 border-r">{deletedBooking.status}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CancelPage;
