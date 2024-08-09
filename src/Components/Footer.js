import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-blue-950 text-white py-6 mt-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between">
                    {/* Company Info */}
                    <div className="w-full sm:w-1/4 mb-6">
                        <h4 className="text-xl font-semibold mb-4">Sarvatra Travel Agency</h4>
                        <p className="text-sm mb-4">Your journey begins with us. Discover the world with our exclusive travel packages and expert guidance.</p>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com/sarvatra" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                                <FaFacebookF size={20} />
                            </a>
                            <a href="https://twitter.com/sarvatra" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                                <FaTwitter size={20} />
                            </a>
                            <a href="https://instagram.com/sarvatra" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                                <FaInstagram size={20} />
                            </a>
                            <a href="https://linkedin.com/company/sarvatra" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                                <FaLinkedinIn size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="w-full sm:w-1/4 mb-6">
                        <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
                        <ul className="text-sm">
                            <li><a href="/about" className="hover:text-gray-400">About Us</a></li>
                            <li><a href="/services" className="hover:text-gray-400">Services</a></li>
                            <li><a href="/packages" className="hover:text-gray-400">Packages</a></li>
                            <li><a href="/contact" className="hover:text-gray-400">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Contact Details */}
                    <div className="w-full sm:w-1/4 mb-6">
                        <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
                        <p className="text-sm mb-2">123 Travel Lane</p>
                        <p className="text-sm mb-2">Travel City, TX 12345</p>
                        <p className="text-sm mb-2">Phone: (123) 456-7890</p>
                        <p className="text-sm mb-2">Email: info@sarvatra.com</p>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="text-center text-sm mt-6">
                    <p>&copy; {new Date().getFullYear()} Sarvatra Travel Agency. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
