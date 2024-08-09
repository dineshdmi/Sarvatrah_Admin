import React, { useState } from 'react';
import { BsPencil, BsCamera } from 'react-icons/bs'; // Import icons from react-icons
import PasswordUpdateForm from './ChangPassword'; // Import the new component
import Modal from '../Models/ProfileModel'; // Import the modal component
import '../CSS/ProfileModel.css';

const ProfilePage = () => {
    const [formData, setFormData] = useState({
        name: 'abc',
        birthday: '',
        gender: '',
        maritalStatus: '',
        mobileNumber: '+91 - 2121212123',
        email: 'ab@gmail.com'
    });
    const [previewImage, setPreviewImage] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);
    const [isChangePasswordMode, setIsChangePasswordMode] = useState(false);
    const [isProfileUpdated, setIsProfileUpdated] = useState(false); // New state for profile success message
    const [isPasswordChanged, setIsPasswordChanged] = useState(false); // New state for password success message

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setPreviewImage(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsEditMode(false);
        setIsProfileUpdated(true); // Show profile success message
        setTimeout(() => setIsProfileUpdated(false), 3000); // Hide after 3 seconds
        // handle form submission logic (e.g., save to backend)
    };

    const handlePasswordChangeSubmit = () => {
        setIsChangePasswordMode(false);
        setIsPasswordChanged(true); // Show password success message
        setTimeout(() => setIsPasswordChanged(false), 3000); // Hide after 3 seconds
        // handle password change logic (e.g., save to backend)
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-wrap justify-between">
                <div className="w-full md:w-1/3 p-4">
                    <div className="bg-white shadow-md rounded-lg p-6 text-center">
                        <div className="relative">
                            <div className="rounded-full overflow-hidden w-32 h-32 mx-auto relative">
                                {previewImage ? (
                                    <img
                                        src={previewImage}
                                        alt="Profile"
                                        className="object-cover w-full h-full"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-200"></div>
                                )}
                                <div className="absolute bottom-0 right-2 mb-2 mr-2 bg-gray-800 text-white rounded-full p-1 cursor-pointer">
                                    <label htmlFor="fileInput">
                                        <input
                                            id="fileInput"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                        <span className="block text-center">
                                            <BsCamera size={24} />
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <h3 className="text-xl font-semibold mt-4">{formData.name}</h3>
                        <p className="text-gray-600">PERSONAL PROFILE</p>
                    </div>
                </div>
                <div className="w-full md:w-2/3 p-4">
                    <div className="bg-white shadow-md rounded-lg mb-6">
                        <div className="border-l-4 border-red-500 p-6">
                            <div className="flex justify-between items-center">
                                <h4 className="text-xl font-semibold">Profile</h4>
                                <button
                                    className="text-blue-500 rounded-lg button flex items-center text-xl"
                                    onClick={() => setIsEditMode(!isEditMode)}
                                >
                                    {isEditMode ? (
                                        <>
                                            <BsPencil size={19} className="mr-2" />
                                            Cancel
                                        </>
                                    ) : (
                                        <>
                                            <BsPencil size={18} className="mr-2" />
                                            Edit
                                        </>
                                    )}
                                </button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="mt-4">
                                    <div className="flex justify-between py-2 border-b">
                                        <span>NAME</span>
                                        {isEditMode ? (
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="border border-gray-300 rounded-lg p-1 w-48"
                                            />
                                        ) : (
                                            <span>{formData.name}</span>
                                        )}
                                    </div>
                                    <div className="flex justify-between py-2 border-b">
                                        <span>BIRTHDAY</span>
                                        {isEditMode ? (
                                            <input
                                                type="date"
                                                name="birthday"
                                                value={formData.birthday}
                                                onChange={handleChange}
                                                className="border border-gray-300 rounded-lg p-1 w-48"
                                            />
                                        ) : (
                                            <span>
                                                {formData.birthday || (
                                                    <button
                                                        type="button" // Prevent form submission
                                                        className="text-blue-500"
                                                        onClick={() => console.log('Add Birthday')}
                                                    >
                                                        + Add
                                                    </button>
                                                )}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex justify-between py-2 border-b">
                                        <span>GENDER</span>
                                        {isEditMode ? (
                                            <select
                                                name="gender"
                                                value={formData.gender}
                                                onChange={handleChange}
                                                className="border border-gray-300 rounded-lg p-1 w-48"
                                            >
                                                <option value="">Select</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        ) : (
                                            <span>
                                                {formData.gender || (
                                                    <button
                                                        type="button" // Prevent form submission
                                                        className="text-blue-500"
                                                        onClick={() => console.log('Add Gender')}
                                                    >
                                                        + Add
                                                    </button>
                                                )}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex justify-between py-2 border-b">
                                        <span>MARITAL STATUS</span>
                                        {isEditMode ? (
                                            <select
                                                name="maritalStatus"
                                                value={formData.maritalStatus}
                                                onChange={handleChange}
                                                className="border border-gray-300 rounded-lg p-1 w-48"
                                            >
                                                <option value="">Select</option>
                                                <option value="Single">Single</option>
                                                <option value="Married">Married</option>
                                                <option value="Divorced">Divorced</option>
                                                <option value="Widowed">Widowed</option>
                                            </select>
                                        ) : (
                                            <span>
                                                {formData.maritalStatus || (
                                                    <button
                                                        type="button" // Prevent form submission
                                                        className="text-blue-500"
                                                        onClick={() => console.log('Add Marital Status')}
                                                    >
                                                        + Add
                                                    </button>
                                                )}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                {isEditMode && (
                                    <div className="mt-4 flex justify-end">
                                        <button
                                            type="submit"
                                            className="bg-blue-500 text-black font-semibold px-4 py-2 rounded-lg w-24 hover:bg-green-200"
                                        >
                                            Save
                                        </button>
                                    </div>
                                )}
                                {isProfileUpdated && (
                                    <div className="mt-4 text-center text-green-500 font-semibold">
                                        Profile updated successfully!
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                    <div className="bg-white shadow-md rounded-lg">
                        <div className="border-l-4 border-red-500 p-6">
                            <h4 className="text-xl font-semibold">Login Details</h4>
                            <p className="text-gray-600">
                                Manage your Email Address, Mobile Number and Password.
                            </p>
                            <div className="mt-4">
                                <div className="flex justify-between py-2 border-b">
                                    <span>MOBILE NUMBER</span>
                                    {isEditMode ? (
                                        <input
                                            type="text"
                                            name="mobileNumber"
                                            value={formData.mobileNumber}
                                            onChange={handleChange}
                                            className="border border-gray-300 rounded-lg p-1"
                                        />
                                    ) : (
                                        <span>{formData.mobileNumber}</span>
                                    )}
                                </div>
                                <div className="flex justify-between py-2 border-b">
                                    <span>Email Id</span>
                                    {isEditMode ? (
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="border border-gray-300 rounded-lg p-1"
                                        />
                                    ) : (
                                        <span>{formData.email}</span>
                                    )}
                                </div>
                                <div className="flex justify-end py-2">
                                    <button
                                        className="text-blue-500"
                                        onClick={() =>
                                            setIsChangePasswordMode(!isChangePasswordMode)
                                        }
                                    >
                                        Change Password?
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={isChangePasswordMode} onClose={() => setIsChangePasswordMode(false)}>
                <PasswordUpdateForm onSubmit={handlePasswordChangeSubmit} />
            </Modal>
            {isPasswordChanged && (
                <div className="mt-4 text-center text-green-500 font-semibold">
                    Password changed successfully!
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
