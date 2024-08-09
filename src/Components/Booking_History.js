import React, { useState } from 'react';
import { FaEye } from 'react-icons/fa'; // Importing the eye icon from react-icons/fa
import BookingDetailsModal from '../Components/Models/BookingDetailsModal '; // Adjust the path as per your project structure

const Booking_History = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null); // State to store selected booking

  // Sample data for bookings (replace with actual data from API or state)
  const bookings = [
    {
      id: 1,
      bookingDate: '2024-07-16',
      generalDetails: 'Lorem ipsum dolor sit amet',
      paymentDetails: '$100.00 Paid',
      // Add more fields as needed
    },
    {
      id: 2,
      bookingDate: '2024-07-15',
      generalDetails: 'Consectetur adipiscing elit',
      paymentDetails: '$50.00 Pending',
      // Add more fields as needed
    },
    // Add more booking entries as needed
  ];

  // Function to handle click on eye icon
  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setShowDetails(true); // Show modal or details area
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Booking History</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              <th className="text-left py-3 px-4">Booking ID</th>
              <th className="text-left py-3 px-4">Booking Date</th>
              <th className="text-left py-3 px-4">Booking General Details</th>
              <th className="text-left py-3 px-4">Payment Details</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-b border-gray-300">
                <td className="py-3 px-4">{booking.id}</td>
                <td className="py-3 px-4">{booking.bookingDate}</td>
                <td className="py-3 px-4">{booking.generalDetails}</td>
                <td className="py-3 px-4">{booking.paymentDetails}</td>
                <td className="py-3 px-4">
                  <button
                    className="text-blue-500 hover:text-blue-600 focus:outline-none"
                    onClick={() => handleViewDetails(booking)}
                  >
                    <FaEye className="text-xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal or details display area */}
      {showDetails && (
        <BookingDetailsModal
          booking={selectedBooking}
          onClose={() => setShowDetails(false)}
        />
      )}
    </div>
  );
};

export default Booking_History;
