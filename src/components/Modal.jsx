import React, { useEffect } from 'react';


const Modal = ({ children, onClose }) => {
  // Effect to handle the Escape key press for closing the modal
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose(); // Close the modal when Escape key is pressed
      }
    };

    // Add event listener for keydown events
    window.addEventListener('keydown', handleKeyDown);
    
    // Cleanup function to remove the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]); // Dependency array includes onClose to ensure the latest function is used

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out" 
      onClick={onClose} // Close modal when clicking outside of the content
      aria-modal="true" // Accessibility attribute indicating this is a modal
      role="dialog" // Accessibility role for screen readers
    >
      <div 
        className="bg-white rounded-lg shadow-lg p-4 sm:p-6 max-w-full sm:max-w-lg w-full h-auto relative mx-4"
        onClick={(e) => e.stopPropagation()} // Prevent click events from bubbling up to the background
      >
        <div className="absolute -top-10 -right-6 p-2">
          <button 
            onClick={(e) => {
              e.stopPropagation(); // Prevent background click when closing
              onClose(); // Close the modal
            }} 
            aria-label="Close modal" // Accessibility label for the close button
            className='text-red-500 text-3xl hover:text-red-700'
          >
            &times; {/* Close icon (X) */}
          </button>
        </div>
        <div className="overflow-y-auto max-h-60 sm:max-h-80">
          {children} {/* Render the content passed as children */}
        </div>
      </div>
    </div>
  );
};


export default Modal;