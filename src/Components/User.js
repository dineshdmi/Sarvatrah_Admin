import React, { useState, useEffect } from 'react';
import { FaSpinner, FaEdit, FaTrash, FaEye, FaPlus } from 'react-icons/fa';
import './CSS/User.css';

const User = () => {
    const [users, setUsers] = useState([
        {
            id: 1,
            name: 'John Doe',
            phone: '123-456-7890',
            email: 'john@example.com',
            isActive: true,
            birthday: '1990-01-01',
            gender: 'Male',
            maritalStatus: 'Single',
        },
        {
            id: 2,
            name: 'Harry Doe',
            phone: '987-654-3210',
            email: 'harry@example.com',
            isActive: false,
            birthday: '1985-05-05',
            gender: 'Male',
            maritalStatus: 'Married',
        },
        // Add more users as needed
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [editUser, setEditUser] = useState(null);
    const [viewUser, setViewUser] = useState(null); // State to track which user's details to view
    const [confirmDeleteUserId, setConfirmDeleteUserId] = useState(null); // State to track user id for delete confirmation
    const [newUser, setNewUser] = useState(null); // State to track new user addition
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        // Simulate data fetching
        setTimeout(() => {
            setLoading(false);
        }, 1000); // Adjust the timeout duration as needed
    }, []);

    // Function to toggle user's active status
    const handleToggleActive = (id) => {
        const updatedUsers = users.map(user =>
            user.id === id ? { ...user, isActive: !user.isActive } : user
        );
        setUsers(updatedUsers);
    };

    // Function to delete a user
    const handleDeleteUser = (id) => {
        // Open confirmation modal or directly delete the user
        setConfirmDeleteUserId(id);
    };

    // Function to confirm deletion of user
    const confirmDelete = () => {
        const updatedUsers = users.filter(user => user.id !== confirmDeleteUserId);
        setUsers(updatedUsers);
        setConfirmDeleteUserId(null); // Close confirmation modal
    };

    // Function to set user for editing
    const handleEditUser = (user) => {
        setEditUser(user);
    };

    // Function to view user details
    const handleViewUser = (user) => {
        setViewUser(user); // Set the user to view details
    };

    // Function to handle search input change
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    // Function to handle form submission when editing a user
    const handleEditFormSubmit = (event) => {
        event.preventDefault();
        const updatedUsers = users.map(user =>
            user.id === editUser.id ? editUser : user
        );
        setUsers(updatedUsers);
        setEditUser(null);
    };

    // Function to handle input change when editing a user
    const handleEditInputChange = (event) => {
        const { name, value } = event.target;
        setEditUser({ ...editUser, [name]: value });
    };

    // Function to handle input change when adding a new user
    const handleNewUserInputChange = (event) => {
        const { name, value } = event.target;
        setNewUser({ ...newUser, [name]: value });
    };

    // Function to handle form submission when adding a new user
    const handleNewUserFormSubmit = (event) => {
        event.preventDefault();
        setUsers([...users, { ...newUser, id: users.length + 1, isActive: true }]);
        setNewUser(null);
    };

    // Filter users based on search term
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
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
        <div className='mr-6 ml-3 shadow-lg h-full w-11/12 bg-white'>
            <div className="container mx-auto mt-6">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold mb-4 border-b-2 border-b-gray-100 p-7 border-l-8 border-l-blue-400">Customer List</h1>
                    <button
                        className="flex items-center bg-blue-500 text-white px-3 py-2 rounded-md"
                        onClick={() => setNewUser({})}
                    >
                        <FaPlus className="mr-2" /> Add New
                    </button>
                </div>

                <div className="flex justify-end items-center mb-4">
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
                                <th className="py-2 px-4 border-b border-gray-300 border-r">Name</th>
                                <th className="py-2 px-4 border-b border-gray-300 border-r">Phone Number</th>
                                <th className="py-2 px-4 border-b border-gray-300 border-r">Email</th>
                                <th className="py-2 px-4 border-b border-gray-300 border-r">Birthday</th>
                                <th className="py-2 px-4 border-b border-gray-300 border-r">Gender</th>
                                <th className="py-2 px-4 border-b border-gray-300 border-r">Marital Status</th>
                                <th className="py-2 px-4 border-b border-gray-300 border-r">Status</th>
                                <th className="py-2 px-4 border-b border-gray-300 border-r">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user, index) => (
                                <tr key={user.id} className={index % 2 === 0 ? 'bg-blue-100' : 'bg-white'}>
                                    <td className="py-2 px-4 border-b border-gray-300 border-l border-r">{index + 1}</td>
                                    <td className="py-2 px-4 border-b border-gray-300 border-r">{user.name}</td>
                                    <td className="py-2 px-4 border-b border-gray-300 border-r">{user.phone}</td>
                                    <td className="py-2 px-4 border-b border-gray-300 border-r">{user.email}</td>
                                    <td className="py-2 px-4 border-b border-gray-300 border-r">{user.birthday}</td>
                                    <td className="py-2 px-4 border-b border-gray-300 border-r">{user.gender}</td>
                                    <td className="py-2 px-4 border-b border-gray-300 border-r">{user.maritalStatus}</td>
                                    <td className="py-2 px-4 border-b border-gray-300 text-center border-r">
                                        <button
                                            className={`py-1 px-3 ${user.isActive ? 'bg-green-500' : 'bg-red-500'} text-white rounded`}
                                            onClick={() => handleToggleActive(user.id)}
                                        >
                                            {user.isActive ? 'Active' : 'Inactive'}
                                        </button>
                                    </td>
                                    <td className="py-2 px-4 border-b border-gray-300 text-center border-r">
                                        <button
                                            className="py-1 px-3 bg-blue-500 text-white rounded mr-2"
                                            onClick={() => handleEditUser(user)}
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            className="py-1 px-3 bg-red-500 text-white rounded mr-2"
                                            onClick={() => handleDeleteUser(user.id)}
                                        >
                                            <FaTrash />
                                        </button>
                                        <button
                                            className="py-1 px-3 bg-green-500 text-white rounded"
                                            onClick={() => handleViewUser(user)}
                                        >
                                            <FaEye />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {editUser && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-6 rounded-md shadow-md w-1/2">
                        <h2 className="text-xl font-bold mb-4">Edit Customer</h2>
                        <form onSubmit={handleEditFormSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={editUser.name}
                                    onChange={handleEditInputChange}
                                    className="w-full py-2 px-4 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Phone Number</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={editUser.phone}
                                    onChange={handleEditInputChange}
                                    className="w-full py-2 px-4 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={editUser.email}
                                    onChange={handleEditInputChange}
                                    className="w-full py-2 px-4 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Birthday</label>
                                <input
                                    type="date"
                                    name="birthday"
                                    value={editUser.birthday}
                                    onChange={handleEditInputChange}
                                    className="w-full py-2 px-4 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Gender</label>
                                <select
                                    name="gender"
                                    value={editUser.gender}
                                    onChange={handleEditInputChange}
                                    className="w-full py-2 px-4 border border-gray-300 rounded-md"
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-700">Marital Status</label>
                                <select
                                    name="maritalStatus"
                                    value={editUser.maritalStatus}
                                    onChange={handleEditInputChange}
                                    className="w-full py-2 px-4 border border-gray-300 rounded-md"
                                >
                                    <option value="Single">Single</option>
                                    <option value="Married">Married</option>
                                    <option value="Divorced">Divorced</option>
                                    <option value="Widowed">Widowed</option>
                                </select>
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="submit"
                                    className="py-2 px-4 bg-blue-500 text-white rounded-md"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    className="py-2 px-4 bg-gray-500 text-white rounded-md"
                                    onClick={() => setEditUser(null)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {newUser && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-6 rounded-md shadow-md w-1/2">
                        <h2 className="text-xl font-bold mb-4">Add New Customer</h2>
                        <form onSubmit={handleNewUserFormSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={newUser.name || ''}
                                    onChange={handleNewUserInputChange}
                                    className="w-full py-2 px-4 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Phone Number</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={newUser.phone || ''}
                                    onChange={handleNewUserInputChange}
                                    className="w-full py-2 px-4 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={newUser.email || ''}
                                    onChange={handleNewUserInputChange}
                                    className="w-full py-2 px-4 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Birthday</label>
                                <input
                                    type="date"
                                    name="birthday"
                                    value={newUser.birthday || ''}
                                    onChange={handleNewUserInputChange}
                                    className="w-full py-2 px-4 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Gender</label>
                                <select
                                    name="gender"
                                    value={newUser.gender || 'Male'}
                                    onChange={handleNewUserInputChange}
                                    className="w-full py-2 px-4 border border-gray-300 rounded-md"
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-700">Marital Status</label>
                                <select
                                    name="maritalStatus"
                                    value={newUser.maritalStatus || 'Single'}
                                    onChange={handleNewUserInputChange}
                                    className="w-full py-2 px-4 border border-gray-300 rounded-md"
                                >
                                    <option value="Single">Single</option>
                                    <option value="Married">Married</option>
                                    <option value="Divorced">Divorced</option>
                                    <option value="Widowed">Widowed</option>
                                </select>
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="submit"
                                    className="py-2 px-4 bg-blue-500 text-white rounded-md"
                                >
                                    Add
                                </button>
                                <button
                                    type="button"
                                    className="py-2 px-4 bg-gray-500 text-white rounded-md"
                                    onClick={() => setNewUser(null)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {confirmDeleteUserId && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-6 rounded-md shadow-md w-1/3">
                        <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
                        <p className="mb-4">Are you sure you want to delete this user?</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                className="py-2 px-4 bg-red-500 text-white rounded-md"
                                onClick={confirmDelete}
                            >
                                Delete
                            </button>
                            <button
                                className="py-2 px-4 bg-gray-500 text-white rounded-md"
                                onClick={() => setConfirmDeleteUserId(null)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {viewUser && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-6 rounded-md shadow-md w-1/2">
                        <h2 className="text-xl font-bold mb-4">View Customer Details</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-700 font-bold">Name:</label>
                                <input
                                    type="text"
                                    value={viewUser.name}
                                    readOnly
                                    className="w-full py-2 px-4 border border-gray-300 rounded-md bg-gray-100"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-bold">Phone Number:</label>
                                <input
                                    type="text"
                                    value={viewUser.phone}
                                    readOnly
                                    className="w-full py-2 px-4 border border-gray-300 rounded-md bg-gray-100"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-bold">Email:</label>
                                <input
                                    type="email"
                                    value={viewUser.email}
                                    readOnly
                                    className="w-full py-2 px-4 border border-gray-300 rounded-md bg-gray-100"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-bold">Birthday:</label>
                                <input
                                    type="date"
                                    value={viewUser.birthday}
                                    readOnly
                                    className="w-full py-2 px-4 border border-gray-300 rounded-md bg-gray-100"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-bold">Gender:</label>
                                <input
                                    type="text"
                                    value={viewUser.gender}
                                    readOnly
                                    className="w-full py-2 px-4 border border-gray-300 rounded-md bg-gray-100"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-bold">Marital Status:</label>
                                <input
                                    type="text"
                                    value={viewUser.maritalStatus}
                                    readOnly
                                    className="w-full py-2 px-4 border border-gray-300 rounded-md bg-gray-100"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end space-x-4 mt-4">
                            <button
                                className="py-2 px-4 bg-gray-500 text-white rounded-md"
                                onClick={() => setViewUser(null)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default User;
