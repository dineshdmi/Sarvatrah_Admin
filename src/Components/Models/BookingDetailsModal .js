import React from 'react';

const BookingDetailsModal = ({ booking, onClose }) => {
    if (!booking) return null; // Handle case where booking is not set

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded shadow-md max-w-lg">
                <h2 className="text-2xl font-bold mb-4">Booking Details</h2>
                <div className="mb-4">
                    <p><strong>Booking ID:</strong> {booking.id}</p>
                    <p><strong>Booking Date:</strong> {booking.bookingDate}</p>
                    <p><strong>General Details:</strong> {booking.generalDetails}</p>
                    <p><strong>Payment Details:</strong> {booking.paymentDetails}</p>
                    {/* Add more fields as needed */}
                </div>
                <div className="flex justify-end">
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookingDetailsModal;
