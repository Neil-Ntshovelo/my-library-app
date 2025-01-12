import React, { useState } from 'react'; 
import { NavLink } from 'react-router-dom'; 
import logo from '../assets/logo.jpg'; 
import { FaBars, FaTimes } from 'react-icons/fa';


const NavBar = () => {
  // State to manage the open/closed status of the mobile menu
  const [isOpen, setIsOpen] = useState(false); 

  // Function to toggle the menu open/closed state
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  
  

  return (
    // Navigation bar element with styling
    <nav className="bg-gray-800 p-4 mb-20 rounded-t-lg sticky top-0 z-50" role="navigation">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and title section */}
        <div className="flex items-center">
          <img src={logo} alt="Application Logo" className="h-12 rounded-l-2xl mr-2" />
          <h1 className="text-xl font-medium bg-gradient-to-r from-gray-700 to-blue-200 bg-clip-text text-transparent">
            My-Book-Application 
          </h1>
        </div>
      </div>
       
    </nav>
  );
};


export default NavBar;