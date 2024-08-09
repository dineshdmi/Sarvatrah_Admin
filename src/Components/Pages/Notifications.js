import React, { useState, useEffect, useRef } from 'react';
import { IoMdMore, IoMdRefresh } from 'react-icons/io';
import { FaSpinner } from 'react-icons/fa'; // Import a spinner icon

const Notification = () => {
    const [loading, setLoading] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const handleRefresh = () => {
        setLoading(true);
        // Simulate an API call or any async operation
        setTimeout(() => {
            setLoading(false);
        }, 1000); // Adjust the timeout duration as needed
    };

    const toggleDropdown = () => {
        setDropdown(!dropdown);
    };

    const handleMarkAllAsRead = () => {
        // Implement the logic for marking all as read
        console.log("Marked all as read");
        setDropdown(false); // Close the dropdown after the action
    };

    const handleClearAllNotifications = () => {
        // Implement the logic for clearing all notifications
        console.log("Cleared all notifications");
        setDropdown(false); // Close the dropdown after the action
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdown(false);
        }
    };

    useEffect(() => {
        if (dropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdown]);

    return (
        <>
            <div className='relative w-full flex justify-start items-start'>
                <input type="checkbox" className='text-3xl border-3 border-gray-500 mt-10 ml-10 size-6' />
                <button onClick={handleRefresh} className='mt-10 ml-3'>
                    {loading ? (
                        <FaSpinner className='text-3xl border-3 border-gray-500 animate-spin' />
                    ) : (
                        <IoMdRefresh className='text-3xl border-3 border-gray-500' />
                    )}
                </button>
                <button onClick={toggleDropdown} className='mt-10 ml-3'>
                    <IoMdMore className='text-3xl border-3 border-gray-500 size-6' />
                </button>
                {dropdown && (
                    <div ref={dropdownRef} className="absolute top-16 left-32 mt-0 w-48 bg-white border border-gray-300 shadow-lg rounded">
                        <button
                            onClick={handleMarkAllAsRead}
                            className="w-full px-4 py-2 text-left text-black hover:bg-gray-100"
                        >
                            Mark all as read
                        </button>
                        <button
                            onClick={handleClearAllNotifications}
                            className="w-full px-4 py-2 text-left text-black hover:bg-gray-100"
                        >
                            Clear all
                        </button>
                    </div>
                )}
                {loading && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
                        <span className="text-white text-2xl">Loading...</span>
                    </div>
                )}
            </div>
        </>
    );
};

export default Notification;
