import React from 'react';


const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center p-4"> 
      <p>&copy; {new Date().getFullYear()} My Book Application. All rights reserved.</p> {/* Copyright notice with the current year */}
    </footer>
  );
};


export default Footer;