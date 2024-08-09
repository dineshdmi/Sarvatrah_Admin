import React, { useState, useEffect } from 'react';
import { FaSpinner, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

import '../CSS/Newbooking.css';

const NewBooking = () => {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      customerName: 'John Doe',
      packageName: 'Holiday Package',
      durationDays: 7,
      startDate: '2024-07-16',
      endDate: '2024-07-23',
      numberOfPeople: 2,
      numberOfRooms: 1,
      vehicle: 'Sedan',
      status: 'Pending',
    },
    {
      id: 2,
      customerName: 'Jane Smith',
      packageName: 'Weekend Getaway',
      durationDays: 3,
      startDate: '2024-07-20',
      endDate: '2024-07-23',
      numberOfPeople: 4,
      numberOfRooms: 2,
      vehicle: 'SUV',
      status: 'Pending',
    },
    {
      id: 3,
      customerName: 'Jane d',
      packageName: 'Weekend north',
      durationDays: 3,
      startDate: '2024-09-12',
      endDate: '2024-07-23',
      numberOfPeople: 4,
      numberOfRooms: 2,
      vehicle: 'Fortuner',
      status: 'Pending',
    },
    {
      id: 4,
      customerName: 'Jane m',
      packageName: 'Weekend ',
      durationDays: 3,
      startDate: '2024-09-12',
      endDate: '2024-07-23',
      numberOfPeople: 4,
      numberOfRooms: 2,
      vehicle: 'Fortuner',
      status: 'Pending',
    },
    // Add more bookings as needed
  ]);
  const [acceptedBookings, setAcceptedBookings] = useState([]);

  const navigate = useNavigate(); // Initialize useNavigate
  const [searchTerm, setSearchTerm] = useState('');
  const [editBooking, setEditBooking] = useState(null);
  const [viewBooking, setViewBooking] = useState(null); // State to track which booking's details to view
  const [confirmDeleteBookingId, setConfirmDeleteBookingId] = useState(null); // State to track booking id for delete confirmation
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setLoading(false);
    }, 1000); // Adjust the timeout duration as needed
  }, []);

  // Function to handle search input change
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Function to handle booking status toggle
  const handleToggleStatus = (id) => {
    const updatedBookings = bookings.map(booking =>
      booking.id === id ? {
        ...booking,
        status: booking.status === 'Pending' ? 'Accepted' : 'Pending'
      } : booking
    );
    setBookings(updatedBookings);
    const accepted = updatedBookings.filter(booking => booking.status === 'Accepted');
    setAcceptedBookings(accepted);
    if (updatedBookings.find(booking => booking.id === id).status === 'Accepted') {
      navigate('/accept', { state: { acceptedBookings } });
    }
  };

  // Function to delete a booking
  const handleDeleteBooking = (id) => {
    // Open confirmation modal or directly delete the booking
    setConfirmDeleteBookingId(id);
  };

  // Function to confirm deletion of booking
  const confirmDelete = () => {
    const deletedBooking = bookings.find(booking => booking.id === confirmDeleteBookingId);
    const updatedBookings = bookings.filter(booking => booking.id !== confirmDeleteBookingId);
    setBookings(updatedBookings);
    setConfirmDeleteBookingId(null); // Close confirmation modal

    // Navigate to CancelPage with deleted booking details
    navigate('/cancelPage', { state: { deletedBooking } });
  };

  // Function to set booking for editing
  const handleEditBooking = (booking) => {
    setEditBooking(booking);
  };

  // Function to view booking details
  const handleViewBooking = (booking) => {
    setViewBooking(booking); // Set the booking to view details
  };

  // Function to handle form submission when editing a booking
  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    const updatedBookings = bookings.map(booking =>
      booking.id === editBooking.id ? editBooking : booking
    );
    setBookings(updatedBookings);
    setEditBooking(null);
  };

  // Function to handle input change when editing a booking
  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditBooking({ ...editBooking, [name]: value });
  };

  // Filter bookings based on search term
  const filteredBookings = bookings.filter(booking =>
    booking.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="flex items-center space-x-2">
          <FaSpinner className="text-3xl text-white animate-spin" />
          <span className="text-white text-lg animate-pulse bg-clip-text">Sarvatrah...</span>
        </div>
      </div>
    );
  }

  return (
    <div className='mr-6 ml-3 shadow-lg h-full w-11/12+1 bg-white'>
      <div className="container mx-auto mt-6">
        <h1 className="text-2xl font-bold mb-4 border-b-2 border-b-gray-100 p-7 border-l-8 border-l-blue-400">New Bookings</h1>
        <div className="flex justify-end items-center mb-4 sm:mb-0">
          <div className="mr-3 mt-1">
            <label htmlFor="search" className="text-gray-900">Search :</label>
          </div>
          <div className="w-full sm:w-96">
            <input
              id="search"
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={handleSearch}
              className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

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
                {/* <th className="py-2 px-4 border-b border-gray-300 border-r">Payment Details</th> */}
                <th className="py-2 px-4 border-b border-gray-300 border-r">Status</th>
                <th className="py-2 px-4 border-b border-gray-300 border-r">Actions</th>
              </tr> 
            </thead>
            <tbody>
              {filteredBookings.map((booking, index) => (
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
                  {/* <td className="py-2 px-4 border-b border-gray-300 border-r">{booking.paymentDetails}</td> */}
                  <td className="py-2 px-4 border-b border-gray-300 text-center border-r">
                    <button
                      className={`py-1 px-3 ${booking.status === 'Accepted' ? 'bg-green-500' : 'bg-red-500'} text-white rounded`}
                      onClick={() => handleToggleStatus(booking.id)}
                    >
                      {booking.status}
                    </button>
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300 text-center border-r">
                    <div className="action-buttons">
                      <button
                        className="bg-blue-500"
                        onClick={() => handleEditBooking(booking)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="bg-red-500"
                        onClick={() => handleDeleteBooking(booking.id)}
                      >
                        <FaTrash />
                      </button>
                      <button
                        className="bg-yellow-500"
                        onClick={() => handleViewBooking(booking)}
                      >
                        <FaEye />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {editBooking && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-8 rounded shadow-md w-11/12 md:w-1/2">
              <h2 className="text-2xl font-bold mb-4">Edit New Booking</h2>
              <form onSubmit={handleEditFormSubmit}>
                <div className="mb-4">
                  <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">Customer Name:</label>
                  <input
                    id="customerName"
                    type="text"
                    name="customerName"
                    value={editBooking.customerName}
                    onChange={handleEditInputChange}
                    className="py-2 px-4 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="packageName" className="block text-sm font-medium text-gray-700">Package Name:</label>
                  <input
                    id="packageName"
                    type="text"
                    name="packageName"
                    value={editBooking.packageName}
                    onChange={handleEditInputChange}
                    className="py-2 px-4 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="durationDays" className="block text-sm font-medium text-gray-700">Duration (Days):</label>
                  <input
                    id="durationDays"
                    type="number"
                    name="durationDays"
                    value={editBooking.durationDays}
                    onChange={handleEditInputChange}
                    className="py-2 px-4 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date:</label>
                  <input
                    id="startDate"
                    type="date"
                    name="startDate"
                    value={editBooking.startDate}
                    onChange={handleEditInputChange}
                    className="py-2 px-4 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date:</label>
                  <input
                    id="endDate"
                    type="date"
                    name="endDate"
                    value={editBooking.endDate}
                    onChange={handleEditInputChange}
                    className="py-2 px-4 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="numberOfPeople" className="block text-sm font-medium text-gray-700">No. of People:</label>
                  <input
                    id="numberOfPeople"
                    type="number"
                    name="numberOfPeople"
                    value={editBooking.numberOfPeople}
                    onChange={handleEditInputChange}
                    className="py-2 px-4 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="numberOfRooms" className="block text-sm font-medium text-gray-700">No. of Rooms:</label>
                  <input
                    id="numberOfRooms"
                    type="number"
                    name="numberOfRooms"
                    value={editBooking.numberOfRooms}
                    onChange={handleEditInputChange}
                    className="py-2 px-4 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="vehicle" className="block text-sm font-medium text-gray-700">Vehicle:</label>
                  <input
                    id="vehicle"
                    type="text"
                    name="vehicle"
                    value={editBooking.vehicle}
                    onChange={handleEditInputChange}
                    className="py-2 px-4 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                {/* <div className="mb-4">
                  <label htmlFor="paymentDetails" className="block text-sm font-medium text-gray-700">Payment Details:</label>
                  <input
                    id="paymentDetails"
                    type="text"
                    name="paymentDetails"
                    value={editBooking.paymentDetails}
                    onChange={handleEditInputChange}
                    className="py-2 px-4 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div> */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="py-2 px-4 bg-gray-500 text-white rounded mr-2"
                    onClick={() => setEditBooking(null)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-2 px-4 bg-blue-500 text-white rounded"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {viewBooking && (
          <div className="fixed inset-0 flex items-start justify-center bg-gray-900 bg-opacity-50 p-4 md:p-8">
            <div className="bg-white p-6 md:p-8 rounded shadow-md w-full max-w-lg md:max-w-2xl">
              <h2 className="text-2xl font-bold mb-4">New Booking Details</h2>
              <form className="space-y-4">
                <div className="flex flex-col">
                  <label htmlFor="customerName" className="text-gray-700 font-semibold mb-1">Customer Name:</label>
                  <input
                    id="customerName"
                    type="text"
                    value={viewBooking.customerName}
                    readOnly
                    className="py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="packageName" className="text-gray-700 font-semibold mb-1">Package Name:</label>
                  <input
                    id="packageName"
                    type="text"
                    value={viewBooking.packageName}
                    readOnly
                    className="py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="durationDays" className="text-gray-700 font-semibold mb-1">Duration (Days):</label>
                  <input
                    id="durationDays"
                    type="number"
                    value={viewBooking.durationDays}
                    readOnly
                    className="py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="startDate" className="text-gray-700 font-semibold mb-1">Start Date:</label>
                  <input
                    id="startDate"
                    type="date"
                    value={viewBooking.startDate}
                    readOnly
                    className="py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="endDate" className="text-gray-700 font-semibold mb-1">End Date:</label>
                  <input
                    id="endDate"
                    type="date"
                    value={viewBooking.endDate}
                    readOnly
                    className="py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="numberOfPeople" className="text-gray-700 font-semibold mb-1">No. of People:</label>
                  <input
                    id="numberOfPeople"
                    type="number"
                    value={viewBooking.numberOfPeople}
                    readOnly
                    className="py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="numberOfRooms" className="text-gray-700 font-semibold mb-1">No. of Rooms:</label>
                  <input
                    id="numberOfRooms"
                    type="number"
                    value={viewBooking.numberOfRooms}
                    readOnly
                    className="py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="vehicle" className="text-gray-700 font-semibold mb-1">Vehicle:</label>
                  <input
                    id="vehicle"
                    type="text"
                    value={viewBooking.vehicle}
                    readOnly
                    className="py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                {/* Uncomment and update if needed */}
                {/* <div className="flex flex-col">
          <label htmlFor="paymentDetails" className="text-gray-700 font-semibold mb-1">Payment Details:</label>
          <input
            id="paymentDetails"
            type="text"
            value={viewBooking.paymentDetails}
            readOnly
            className="py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div> */}
                <div className="flex flex-col">
                  <label htmlFor="status" className="text-gray-700 font-semibold mb-1">Status:</label>
                  <input
                    id="status"
                    type="text"
                    value={viewBooking.status}
                    readOnly
                    className={`py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 ${viewBooking.status === 'Accepted' ? 'text-green-600' : 'text-red-600'}`}
                  />
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    type="button"
                    className="py-2 px-4 bg-gray-500 text-white rounded"
                    onClick={() => setViewBooking(null)}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}




        {confirmDeleteBookingId && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-md">
              <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
              <p>Are you sure you want to delete this New Booking?</p>
              <div className="flex justify-end mt-4">
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => setConfirmDeleteBookingId(null)}  >
                  Cancel
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewBooking;
