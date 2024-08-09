import React, { useState } from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';

const HolidayPackage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [packages, setPackages] = useState([
    {
      id: 1,
      code: 'HP001',
      packageName: 'Tropical Paradise',
      duration: '7 Days / 6 Nights',
      pricePerPerson: '$1500',
      location: 'Maldives',
      highlight: 'Snorkeling, Beaches, Luxury Resorts',
      status: 'Active',
    },
    {
      id: 2,
      code: 'HP002',
      packageName: 'Cultural Heritage',
      duration: '5 Days / 4 Nights',
      pricePerPerson: '$1200',
      location: 'India',
      highlight: 'Temples, Local Cuisine, Historical Sites',
      status: 'Deactive',
    },
  ]);

  const [editPackage, setEditPackage] = useState(null);
  const [viewPackage, setViewPackage] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleEdit = (pkg) => {
    setEditPackage(pkg);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowConfirmDelete(true);
  };

  const confirmDelete = () => {
    const updatedPackages = packages.filter(pkg => pkg.id !== deleteId);
    setPackages(updatedPackages);
    setShowConfirmDelete(false);
  };

  const cancelDelete = () => {
    setShowConfirmDelete(false);
  };

  const handleView = (pkg) => {
    setViewPackage(pkg);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    const updatedPackages = packages.map(pkg =>
      pkg.id === editPackage.id ? editPackage : pkg
    );
    setPackages(updatedPackages);
    setEditPackage(null);
  };

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditPackage({ ...editPackage, [name]: value });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleStatus = (id) => {
    const updatedPackages = packages.map(pkg =>
      pkg.id === id ? { ...pkg, status: pkg.status === 'Active' ? 'Deactive' : 'Active' } : pkg
    );
    setPackages(updatedPackages);
  };

  return (
    <div className="mr-6 ml-3 shadow-lg h-full w-11/12 bg-white">
      <div className="container mx-auto mt-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold mb-4 border-b-2 border-b-gray-100 p-7 border-l-8 border-l-blue-400">Adventure Packages</h1>
        </div>
        <div className="flex flex-col sm:flex-row justify-end items-center mb-4">
          <div className="mr-3 mb-4 sm:mb-0 sm:mr-3">
            <label htmlFor="search" className="text-gray-900">Search:</label>
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
                <th className="py-2 px-4 border-b border-r">Product Code</th>
                <th className="py-2 px-4 border-b border-r">Adventure Name</th>
                <th className="py-2 px-4 border-b border-r">Duration (Days and Nights)</th>
                <th className="py-2 px-4 border-b border-r">Per Person Price</th>
                <th className="py-2 px-4 border-b border-r">Location</th>
                <th className="py-2 px-4 border-b border-r">Adventure Highlight</th>
                <th className="py-2 px-4 border-b border-r">Status</th>
                <th className="py-2 px-4 border-b border-r">Actions</th>
              </tr>
            </thead>
            <tbody>
              {packages.filter(pkg =>
                pkg.packageName.toLowerCase().includes(searchTerm.toLowerCase())
              ).map((pkg, index) => (
                <tr key={pkg.id} className={index % 2 === 0 ? 'bg-blue-100' : 'bg-white'}>
                  <td className="py-2 px-4 border-b border-r">{pkg.code}</td>
                  <td className="py-2 px-4 border-b border-r">{pkg.packageName}</td>
                  <td className="py-2 px-4 border-b border-r">{pkg.duration}</td>
                  <td className="py-2 px-4 border-b border-r">{pkg.pricePerPerson}</td>
                  <td className="py-2 px-4 border-b border-r">{pkg.location}</td>
                  <td className="py-2 px-4 border-b border-r">{pkg.highlight}</td>
                  <td className="py-2 px-4 border-b border-r">
                    <button
                      className={`py-1 px-3 ${pkg.status === 'Active' ? 'bg-green-500' : 'bg-red-500'} text-white rounded`}
                      onClick={() => toggleStatus(pkg.id)}
                    >
                      {pkg.status}
                    </button>
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <button
                      className="py-1 px-3 bg-blue-500 text-white rounded mr-2"
                      onClick={() => handleEdit(pkg)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="py-1 px-3 bg-red-500 text-white rounded mr-2"
                      onClick={() => handleDelete(pkg.id)}
                    >
                      <FaTrash />
                    </button>
                    <button
                      className="py-1 px-3 bg-yellow-500 text-white rounded"
                      onClick={() => handleView(pkg)}
                    >
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal for Editing Package */}
        {editPackage && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
              <h2 className="text-xl font-bold mb-4">Edit Adventure Package</h2>
              <form onSubmit={handleEditFormSubmit} className="space-y-4">
                <div className="mb-4">
                  <label htmlFor="code" className="block text-gray-700">Product Code</label>
                  <input
                    type="text"
                    id="code"
                    name="code"
                    value={editPackage.code}
                    onChange={handleEditInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="packageName" className="block text-gray-700">Package Name</label>
                  <input
                    type="text"
                    id="packageName"
                    name="packageName"
                    value={editPackage.packageName}
                    onChange={handleEditInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="duration" className="block text-gray-700">Duration</label>
                  <input
                    type="text"
                    id="duration"
                    name="duration"
                    value={editPackage.duration}
                    onChange={handleEditInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="pricePerPerson" className="block text-gray-700">Per Person Price</label>
                  <input
                    type="text"
                    id="pricePerPerson"
                    name="pricePerPerson"
                    value={editPackage.pricePerPerson}
                    onChange={handleEditInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="location" className="block text-gray-700">Location</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={editPackage.location}
                    onChange={handleEditInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="highlight" className="block text-gray-700">Package Highlight</label>
                  <input
                    type="text"
                    id="highlight"
                    name="highlight"
                    value={editPackage.highlight}
                    onChange={handleEditInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="status" className="block text-gray-700">Status</label>
                  <select
                    id="status"
                    name="status"
                    value={editPackage.status}
                    onChange={handleEditInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="Active">Active</option>
                    <option value="Deactive">Deactive</option>
                  </select>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setEditPackage(null)}
                    className="py-2 px-4 bg-gray-500 text-white rounded mr-2"
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

        {/* Modal for Viewing Package */}
        {viewPackage && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
              <h2 className="text-xl font-bold mb-4">View Adventure Package</h2>
              <div className="space-y-4">
                <div className="mb-4">
                  <label className="block text-gray-700">Product Code</label>
                  <p className="w-full p-2 border border-gray-300 rounded-md">{viewPackage.code}</p>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Package Name</label>
                  <p className="w-full p-2 border border-gray-300 rounded-md">{viewPackage.packageName}</p>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Duration</label>
                  <p className="w-full p-2 border border-gray-300 rounded-md">{viewPackage.duration}</p>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Per Person Price</label>
                  <p className="w-full p-2 border border-gray-300 rounded-md">{viewPackage.pricePerPerson}</p>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Location</label>
                  <p className="w-full p-2 border border-gray-300 rounded-md">{viewPackage.location}</p>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Package Highlight</label>
                  <p className="w-full p-2 border border-gray-300 rounded-md">{viewPackage.highlight}</p>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Status</label>
                  <p className="w-full p-2 border border-gray-300 rounded-md">{viewPackage.status}</p>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setViewPackage(null)}
                    className="py-2 px-4 bg-gray-500 text-white rounded mr-2"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showConfirmDelete && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
              <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
              <p>Are you sure you want to delete this package?</p>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={cancelDelete}
                  className="py-2 px-4 bg-gray-500 text-white rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmDelete}
                  className="py-2 px-4 bg-red-500 text-white rounded"
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

export default HolidayPackage;
