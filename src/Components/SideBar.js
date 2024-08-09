import React, { useState } from 'react';
import { FaChevronRight, FaChevronDown, FaUser, FaStar, FaCreditCard, FaBox } from "react-icons/fa";
import { MdOutlineSegment, MdOutlineHistory } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { Si1Password } from "react-icons/si";
import { Link } from 'react-router-dom';
import logo from '../assets/images/Logo.png'; // Adjust the path as per your project structure
import './CSS/Sidebar.css';
import { hover } from '@testing-library/user-event/dist/hover';

const SideBar = ({ sidebar, toggleSidebar }) => {
    const [userDropdown, setUserDropdown] = useState(false);
    const [historyDropdown, setHistoryDropdown] = useState(false);
    const [paymentDropdown, setPaymentDropdown] = useState(false);
    const [packageDropdown, setPackageDropdown] = useState(false);

    const handleUserClick = () => {
        setUserDropdown(prev => !prev);
    };

    const handleHistoryDropdown = () => {
        setHistoryDropdown(prev => !prev);
    };

    const handlePaymentDropdown = () => {
        setPaymentDropdown(prev => !prev);
    };

    const handlePackageDropdown = () => {
        setPackageDropdown(prev => !prev);
    };

    return (
        <div className="min-h-[105dvh] group">
            <div className={`h-full bg-blue-950 transition-all duration-300 ${sidebar ? "w-24" : "w-64"} group-hover:w-64`}>
                {/* Sidebar Header */}
                <div className="h-25 w-full bg-white flex justify-between items-center px-3">
                    <img src={logo} alt="Logo" className={`h-18 cursor-pointer ${sidebar ? "hidden group-hover:block" : "block"}`} />
                    <MdOutlineSegment
                        className={`${sidebar ? "text-5xl" : "text-4xl"} text-zinc-400 cursor-pointer ml-10`}
                        onClick={toggleSidebar}
                        aria-label="Toggle Sidebar"
                    />
                </div>
                {/* Sidebar Content */}
                <div className="text-white p-5 pt-20">
                    {/* Adjust padding to accommodate logo */}
                    <div className="text-xl mb-8 flex items-center justify-start">
                        <Link to="/" className='flex items-center'>
                            <IoHomeOutline className="text-3xl mr-4" />
                            <span className={`group-hover:block ${sidebar ? "hidden" : "block"}`}>Dashboard</span>
                        </Link>
                    </div>
                    <div
                        className="text-xl mb-4 flex items-center justify-start cursor-pointer"
                        onClick={handleUserClick}
                        aria-expanded={userDropdown}
                    >
                        <FaUser className="text-3xl mr-4" />
                        <span className={`group-hover:block ${sidebar ? "hidden" : "block"}`}>User Management</span>
                        {userDropdown ? <FaChevronDown className="ml-2 text-lg" /> : <FaChevronRight className="ml-2 text-lg" />}
                    </div>
                    {userDropdown && (
                        <ul className={`ml-10 ${userDropdown && sidebar ? 'border-l-2 border-zinc-200 group-hover:border-none' : 'none'} select-none`}>
                            <Link to="/user">
                                <li className={`mb-2 hover:list-disc group-hover:text-white ${sidebar ? "pl-2 text-transparent" : "text-white"}`}>Customer</li>
                            </Link>
                            <Link to="/subadmin">
                                <li className={`hover:list-disc group-hover:text-white ${sidebar ? "pl-2 text-transparent" : "text-white"}`}>Sub-Admin</li>
                            </Link>
                        </ul>
                    )}
                    <div
                        className="text-xl mt-8 flex items-center justify-start cursor-pointer"
                        onClick={handleHistoryDropdown}
                    >
                        <MdOutlineHistory className="text-3xl mr-4" />
                        <span className={`mb-2 group-hover:block ${sidebar ? "hidden" : "block"}`}>Booking History</span>
                        {historyDropdown ? <FaChevronDown className="ml-2 text-lg" /> : <FaChevronRight className="ml-2 text-lg" />}
                    </div>
                    {historyDropdown && (
                        <ul className={`ml-10 ${historyDropdown && sidebar ? 'border-l-2 border-zinc-200 group-hover:border-none' : 'none'} select-none`}>
                            <Link to="/new"><li className={`mb-2 hover:list-disc group-hover:text-white ${sidebar ? "pl-2 text-transparent" : "text-white"} select-none`} >New</li></Link>
                            <Link to="/pending"><li className={`mb-2 hover:list-disc group-hover:text-white ${sidebar ? "pl-2 text-transparent" : "text-white"} select-none`}>Pending</li></Link>
                            <Link to="/accept"><li className={`mb-2 hover:list-disc group-hover:text-white ${sidebar ? "pl-2 text-transparent" : "text-white"} select-none`}>Accept</li></Link>
                            <Link to="/cancelPage"><li className={` hover:list-disc group-hover:text-white ${sidebar ? "pl-2 text-transparent" : "text-white"} select-none`}>Cancel</li></Link>
                        </ul>
                    )}
                   
                    <div
                        className="text-xl mt-8 flex items-center justify-start cursor-pointer"
                        onClick={handlePackageDropdown}
                    >
                        <FaBox className="text-3xl mr-4"/> {/* Icon for New Packages */}
                        <span className={`group-hover:block ${sidebar ? "hidden" : "block"}`}>All Packages</span>
                        {packageDropdown ? <FaChevronDown className="ml-6 text-lg" /> : <FaChevronRight className="ml-7 text-lg" />}
                    </div>
                    {packageDropdown && (
                        <ul className={`ml-10 mt-5 ${packageDropdown && sidebar ? 'border-l-2 border-zinc-200 group-hover:border-none' : 'none'} select-none`}>
                            <Link to="/activity"><li className={`mb-2 hover:list-disc group-hover:text-white ${sidebar ? "pl-2 text-transparent" : "text-white"} select-none`}>Activity Package</li></Link>
                            <Link to="/holiday"><li className={`mb-2 hover:list-disc group-hover:text-white ${sidebar ? "pl-2 text-transparent" : "text-white"} select-none`}>Holiday Package</li></Link>
                            <Link to="/pilgrimage"><li className={`mb-2 hover:list-disc group-hover:text-white ${sidebar ? "pl-2 text-transparent" : "text-white"} select-none`}>Pilgrimage Package</li></Link>
                            <Link to="/adventure"><li className={`mb-2 hover:list-disc group-hover:text-white ${sidebar ? "pl-2 text-transparent" : "text-white"} select-none`}>Adventure Package</li></Link>
                        </ul>
                    )}
                    <div
                        className="text-xl mt-8 flex items-center justify-start cursor-pointer"
                        onClick={handlePaymentDropdown}
                    >
                        <FaCreditCard className="text-3xl mr-4" /> {/* Icon for Partial Payment */}
                        <span className={`group-hover:block ${sidebar ? "hidden" : "block"}`}>Manage<br />Partial Payment</span>
                        {paymentDropdown ? <FaChevronDown className="ml-2 text-lg" /> : <FaChevronRight className="ml-2 text-lg" />}
                    </div><br />
                    {paymentDropdown && (
                        <ul className={`ml-10 ${paymentDropdown && sidebar ? 'border-l-2 border-zinc-200 group-hover:border-none' : 'none'} select-none`}>
                            <Link to="/holiday-partial-payment"><li className={`mb-2 hover:list-disc group-hover:text-white ${sidebar ? "pl-2 text-transparent" : "text-white"} select-none`}>Holiday Partial <br /> Payment</li></Link>
                            <Link to="/pilgrimage-partial-payment"><li className={`mb-2 hover:list-disc group-hover:text-white ${sidebar ? "pl-2 text-transparent" : "text-white"} select-none`}>Pilgrimage Partial <br /> Payment</li></Link>
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SideBar;
