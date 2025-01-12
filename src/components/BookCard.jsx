import React, { useState } from 'react';

// BookCard component to display information about a book
const BookCard = ({ book, onClick, addToReadingList, updateBookProgress, defaultIMG }) => {
  // State to manage the visibility 
  const [showMorePublishers, setShowMorePublishers] = useState(false);

  // Function to toggle the visibility of the publisher list
  const handleTogglePublishers = () => {
    setShowMorePublishers(!showMorePublishers);
  };

  // Split the publisher string into an array
  const publisherList = book.publisher.split(', ');
  // Determine which publishers to display based on the state
  const displayPublishers = showMorePublishers ? publisherList : publisherList.slice(0, 3);

  return (
    <div 
      className="border rounded-lg p-4 shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer" 
      onClick={onClick} // Trigger the onClick function when the card is clicked
    >
      <div className="relative w-full md:w-1/2 h-auto min-h-60 mb-4 overflow-hidden rounded-lg bg-white shadow-md">
        <img 
          src={book.coverUrl} // Book cover image URL
          alt={book.title} // Alt text for the image
          className="absolute inset-0 w-full h-full object-contain transition-transform duration-300 transform hover:scale-110" 
          onError={(e) => { e.target.src = defaultIMG; }} // Fallback image if the cover fails to load
        />
      </div>
      <h3 className="text-lg font-semibold text-blue-950 truncate">{book.title}</h3> {/* Book title */}
      <p className="text-sm text-gray-700 font-medium">{book.author}</p> {/* Book author */}
      
      <div className="text-sm text-gray-500">
        {displayPublishers.join(', ')} {/* Display the list of publishers */}
        {publisherList.length > 3 && !showMorePublishers && (
          <span 
            className="text-blue-500 font-medium cursor-pointer" 
            onClick={handleTogglePublishers} // Show more publishers when clicked
          >
            {' ...'}
          </span>
        )}
        {showMorePublishers && (
          <span 
            className="text-blue-500 cursor-pointer" 
            onClick={handleTogglePublishers} // Show less publishers when clicked
          >
            {' ...less'}
          </span>
        )}
      </div>
      
      <div className="mt-2">
        <button 
          onClick={(e) => {
            e.stopPropagation(); // Prevent the card click event from firing
            addToReadingList(book); // Add the book to the reading list
          }} 
          className="mt-2 bg-stone-400 text-white font-medium px-4 py-1 rounded"
        >
          Add to Reading List
        </button>
      </div>
      
      <p className="text-xs text-gray-400 mt-1">{book.publish_date}</p> {/* Book publish date */}
    </div>
  );
};

export default BookCard;