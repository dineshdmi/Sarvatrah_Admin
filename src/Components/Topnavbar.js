import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { HiOutlineBellAlert } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaChevronDown, FaUserCircle, FaLock, FaBell } from 'react-icons/fa';
import './CSS/Topnavbar.css';

const TopNavbar = ({ sidebar }) => {
    const [dropdown, setDropdown] = useState(false);
    const [count, setCount] = useState(10);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const handleProfileClick = () => {
        setDropdown(!dropdown);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdown(false);
        }
    };

    const handleAlerts = () => {
        navigate('/notification');
    };

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to logout?")) {
            navigate('/logout');
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
            <div className={`h-20 w-full mr-3 bg-white flex justify-end items-center relative`}>
                <HiOutlineBellAlert className="text-black font-thin text-2xl mr-3 cursor-pointer" onClick={handleAlerts} />
                <div className="h-4 w-5 mt-1 rounded-full bg-red-600 text-black flex justify-center items-center absolute top-3 right-14">
                    {count}
                </div>
                <div className="flex items-center cursor-pointer mr-0" onClick={handleProfileClick}>
                    <IoSettingsOutline className="text-black text-2xl mr-2" />
                    {dropdown ? <FaChevronDown className="text-black text-xl ml-1" /> : <MdOutlineKeyboardArrowDown className="text-black font-thin text-xl mr-1" />}
                </div>
            </div>
            {dropdown && (
                <ul ref={dropdownRef} className="w-64 absolute top-20 right-5 rounded-md bg-white list-none z-10 text-lg shadow-md" style={{ width: '20rem' }}>
                    <Link to="/profilePage" className="text-black">
                        <li className="p-3 flex items-center hover:bg-blue-50">
                            <FaUserCircle className="text-xl mr-3" />
                            Dinesh Mahajan
                        </li>
                    </Link>
                    <Link to="/changepassword" className="text-black">
                        <li className="p-3 flex items-center hover:bg-blue-50">
                            <FaLock className="text-xl mr-3" />
                            Change Password
                        </li>
                    </Link>
                    <Link to="/notification" className="text-black">
                        <li className="p-3 flex items-center hover:bg-blue-50">
                            <FaBell className="text-xl mr-3" />
                            Notification
                            <div className='w-6 h-7 rounded-full bg-black text-white ml-2'>{count}</div>
                        </li>
                    </Link>
                    <li className="p-3 flex items-center hover:bg-blue-50 cursor-pointer text-black" onClick={handleLogout}>
                        <IoSettingsOutline className="text-xl mr-3" />
                        Logout
                    </li>
                </ul>
            )}
        </>
    );
};

export default TopNavbar;
