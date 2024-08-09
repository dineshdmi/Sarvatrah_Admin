import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaEye, FaEyeSlash, FaPlus, FaDownload, FaSpinner } from 'react-icons/fa';
import Select from 'react-select';

const SubAdmin = () => {
    const [subAdmins, setSubAdmins] = useState([
        {
            id: 1,
            name: 'John Doe',
            username: 'johndoe',
            password: 'password1',
            profileImage: '',
            authorityModules: ['Edit profile', 'Show booking details'],
            isActive: true,
        },
        {
            id: 2,
            name: 'Harry Doe',
            username: 'harrydoe',
            password: 'password2',
            profileImage: '',
            authorityModules: ['Update status', 'Invoice Download', 'Update payment details'],
            isActive: false,
        },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [editSubAdmin, setEditSubAdmin] = useState(null);
    const [newSubAdmin, setNewSubAdmin] = useState(null); // State for new sub-admin form
    const [viewBookingSubAdminId, setViewBookingSubAdminId] = useState(null);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(true); // Loading state
    
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        // Simulate data fetching
        setTimeout(() => {
            setLoading(false);
        }, 1000); // Adjust the timeout duration as needed
    }, []);

    const handleToggleActive = (id) => {
        const updatedSubAdmins = subAdmins.map(subAdmin =>
            subAdmin.id === id ? { ...subAdmin, isActive: !subAdmin.isActive } : subAdmin
        );
        setSubAdmins(updatedSubAdmins);
    };
    
    const handleDeleteSubAdmin = (id) => {
        setDeleteId(id);
        setShowConfirmDelete(true);
    };

    const confirmDelete = () => {
        const updatedSubAdmins = subAdmins.filter(subAdmin => subAdmin.id !== deleteId);
        setSubAdmins(updatedSubAdmins);
        setShowConfirmDelete(false);
        setDeleteId(null);
    };

    const cancelDelete = () => {
        setShowConfirmDelete(false);
        setDeleteId(null);
    };
    

    const handleEditSubAdmin = (subAdmin) => {
        setEditSubAdmin(subAdmin);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleEditFormSubmit = (event) => {
        event.preventDefault();
        const updatedSubAdmins = subAdmins.map(subAdmin =>
            subAdmin.id === editSubAdmin.id ? editSubAdmin : subAdmin
        );
        setSubAdmins(updatedSubAdmins);
        setEditSubAdmin(null);
    };

    const handleAddFormSubmit = (event) => {
        event.preventDefault();
        const newSubAdminData = { ...newSubAdmin, id: subAdmins.length + 1, isActive: true };
        setSubAdmins([...subAdmins, newSubAdminData]);
        setNewSubAdmin(null); // Close form
    };

    const handleEditInputChange = (event) => {
        const { name, value } = event.target;
        setEditSubAdmin({ ...editSubAdmin, [name]: value });
    };

    const handleAddInputChange = (event) => {
        const { name, value } = event.target;
        setNewSubAdmin({ ...newSubAdmin, [name]: value });
    };

    const handleAuthorityModulesChange = (selectedOptions) => {
        const selectedModules = selectedOptions.map(option => option.value);
        setEditSubAdmin({ ...editSubAdmin, authorityModules: selectedModules });
    };

    const handleAddAuthorityModulesChange = (selectedOptions) => {
        const selectedModules = selectedOptions.map(option => option.value);
        setNewSubAdmin({ ...newSubAdmin, authorityModules: selectedModules });
    };

    const handleAddNewSubAdmin = () => {
        setNewSubAdmin({
            name: '',
            username: '',
            password: '',
            profileImage: '',
            authorityModules: [],
        });
    };

    const handleViewBookingHistory = (id) => {
        setViewBookingSubAdminId(id);
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handleProfileImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            if (editSubAdmin) {
                setEditSubAdmin({ ...editSubAdmin, profileImage: reader.result });
            } else if (newSubAdmin) {
                setNewSubAdmin({ ...newSubAdmin, profileImage: reader.result });
            }
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const filteredSubAdmins = subAdmins.filter(subAdmin =>
        subAdmin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const authorityOptions = [
        'Edit profile',
        'Show booking details',
        'Update status',
        'Invoice Download',
        'Update payment details',
    ];

    const authoritySelectOptions = authorityOptions.map(option => ({
        value: option,
        label: option,
    }));

    const currentSubAdmin = subAdmins.find(subAdmin => subAdmin.id === viewBookingSubAdminId);

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
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold mb-4 border-b-2 border-b-gray-100 p-7 border-l-8 border-l-blue-400">Sub-Admin List</h1>
                    <button
                        className="flex items-center bg-blue-500 text-white px-3 py-2 xxs:mr-3 xs:mr-3 sm:mr-3 rounded"
                        onClick={handleAddNewSubAdmin}
                    >
                        <FaPlus className="mr-2" /> Add New
                    </button>
                </div>

                <div className="flex justify-end items-center mb-4">
                    <div className="mr-3 mt-1">
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
                                <th className="py-2 px-4 border-b border-r">Sr.No</th>
                                <th className="py-2 px-4 border-b border-r">Name</th>
                                <th className="py-2 px-4 border-b border-r">Username</th>
                                <th className="py-2 px-4 border-b border-r">Profile Image</th>
                                <th className="py-2 px-4 border-b border-r">Authority Modules</th>
                                <th className="py-2 px-4 border-b border-r">Status</th>
                                <th className="py-2 px-4 border-b border-r">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSubAdmins.map((subAdmin, index) => (
                                <tr key={subAdmin.id} className={index % 2 === 0 ? 'bg-blue-100' : 'bg-white'}>
                                    <td className="py-2 px-4 border-b border-r">{index + 1}</td>
                                    <td className="py-2 px-4 border-b border-r">{subAdmin.name}</td>
                                    <td className="py-2 px-4 border-b border-r">{subAdmin.username}</td>
                                    <td className="py-2 px-4 border-b border-r">
                                        {subAdmin.profileImage && (
                                            <img src={subAdmin.profileImage} alt="Profile" className="w-8 h-8 rounded-full" />
                                        )}
                                    </td>
                                    <td className="py-2 px-4 border-b border-r">
                                        {subAdmin.authorityModules.join(', ')}
                                    </td>
                                    <td className="py-2 px-4 border-b text-center border-r">
                                        <button
                                            className={`py-1 px-3 ${subAdmin.isActive ? 'bg-green-500' : 'bg-red-500'} text-white rounded`}
                                            onClick={() => handleToggleActive(subAdmin.id)}
                                        >
                                            {subAdmin.isActive ? 'Active' : 'Deactive'}
                                        </button>
                                    </td>
                                    <td className="py-2 px-4 border-b border-r">
                                        <div className="flex space-x-2">
                                            <button
                                                className="bg-blue-500 text-white p-2 rounded"
                                                onClick={() => handleEditSubAdmin(subAdmin)}
                                            >
                                                <FaEdit size={16} />
                                            </button>
                                            <button
                                                className="bg-red-500 text-white p-2 rounded"
                                                onClick={() => handleDeleteSubAdmin(subAdmin.id)}
                                            >
                                                <FaTrash size={16} />
                                            </button>
                                            <button
                                                className="bg-green-500 text-white p-2 rounded"
                                                onClick={() => handleViewBookingHistory(subAdmin.id)}                                            >
                                                {isPasswordVisible ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                                            </button>
                                            {/* <button
                                                className="bg-yellow-500 text-white p-2 rounded"
                                                onClick={() => handleViewBookingHistory(subAdmin.id)}
                                            >
                                                <FaDownload size={16} />
                                            </button> */}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {showConfirmDelete && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded shadow-md">
                            <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
                            <p>Are you sure you want to delete this sub-admin?</p>
                            <div className="flex justify-end mt-4">
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                                    onClick={confirmDelete}
                                >
                                    Yes
                                </button>
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                    onClick={cancelDelete}
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {editSubAdmin && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                        <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
                            <h2 className="text-xl font-bold mb-4">Edit Sub-Admin</h2>
                            <form onSubmit={handleEditFormSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={editSubAdmin.name}
                                        onChange={handleEditInputChange}
                                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        value={editSubAdmin.username}
                                        onChange={handleEditInputChange}
                                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Password</label>
                                    <div className="relative">
                                        <input
                                            type={isPasswordVisible ? 'text' : 'password'}
                                            name="password"
                                            value={editSubAdmin.password}
                                            onChange={handleEditInputChange}
                                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-2 top-2 text-gray-500 focus:outline-none"
                                            onClick={togglePasswordVisibility}
                                        >
                                            {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Profile Image</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleProfileImageChange}
                                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {editSubAdmin.profileImage && (
                                        <img src={editSubAdmin.profileImage} alt="Profile" className="mt-2 w-20 h-20 rounded-full" />
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Authority Modules</label>
                                    <Select
                                        isMulti
                                        value={authoritySelectOptions.filter(option =>
                                            editSubAdmin.authorityModules.includes(option.value)
                                        )}
                                        onChange={handleAuthorityModulesChange}
                                        options={authoritySelectOptions}
                                        className="focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                                        onClick={() => setEditSubAdmin(null)}
                                    >
                                        Cancel
                                    </button>
                                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                {showConfirmDelete && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded shadow-md">
                            <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
                            <p>Are you sure you want to delete this sub-admin?</p>
                            <div className="flex justify-end mt-4">
                                <button
                                    className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                                    onClick={cancelDelete}
                                >
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

                {newSubAdmin && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                        <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
                            <h2 className="text-xl font-bold mb-4">Add New Sub-Admin</h2>
                            <form onSubmit={handleAddFormSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={newSubAdmin.name}
                                        onChange={handleAddInputChange}
                                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        value={newSubAdmin.username}
                                        onChange={handleAddInputChange}
                                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Password</label>
                                    <div className="relative">
                                        <input
                                            type={isPasswordVisible ? 'text' : 'password'}
                                            name="password"
                                            value={newSubAdmin.password}
                                            onChange={handleAddInputChange}
                                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-2 top-2 text-gray-500 focus:outline-none"
                                            onClick={togglePasswordVisibility}
                                        >
                                            {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Profile Image</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleProfileImageChange}
                                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {newSubAdmin.profileImage && (
                                        <img src={newSubAdmin.profileImage} alt="Profile" className="mt-2 w-20 h-20 rounded-full" />
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Authority Modules</label>
                                    <Select
                                        isMulti
                                        value={authoritySelectOptions.filter(option =>
                                            newSubAdmin.authorityModules.includes(option.value)
                                        )}
                                        onChange={handleAddAuthorityModulesChange}
                                        options={authoritySelectOptions}
                                        className="focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                                        onClick={() => setNewSubAdmin(null)}
                                    >
                                        Cancel
                                    </button>
                                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {viewBookingSubAdminId && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                        <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
                            <h2 className="text-2xl font-bold mb-4 border-b-2 border-gray-200 pb-2">Sub Admin History</h2>
                            {currentSubAdmin ? (
                                <form className="space-y-4">
                                    <div className="flex flex-col">
                                        <label className="text-gray-700 font-semibold mb-1">Name</label>
                                        <input
                                            type="text"
                                            value={currentSubAdmin.name}
                                            readOnly
                                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-gray-700 font-semibold mb-1">Username</label>
                                        <input
                                            type="text"
                                            value={currentSubAdmin.username}
                                            readOnly
                                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-gray-700 font-semibold mb-1">Authority Modules</label>
                                        <input
                                            type="text"
                                            value={currentSubAdmin.authorityModules.join(', ')}
                                            readOnly
                                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-gray-700 font-semibold mb-1">Status</label>
                                        <input
                                            type="text"
                                            value={currentSubAdmin.isActive ? 'Active' : 'Deactive'}
                                            readOnly
                                            className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${currentSubAdmin.isActive ? 'text-green-600' : 'text-red-600'}`}
                                        />
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            type="button"
                                            className="bg-gray-500 text-white px-4 py-2 rounded shadow hover:bg-gray-600 transition"
                                            onClick={() => setViewBookingSubAdminId(null)}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <p className="text-gray-500">No booking history available.</p>
                            )}
                        </div>
                    </div>
                )}


            </div>
        </div>
    );
};

export default SubAdmin;






