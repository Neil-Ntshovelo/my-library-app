import React from 'react'; 
import { FaSearch } from 'react-icons/fa'; 


const SearchBar = ({ query, setQuery, onSearch }) => {
  // Function to handle key press events
  const handleKeyPress = (e) => {
    // If the Enter key is pressed, trigger the search function
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    
    <div className="flex items-center border border-gray-300 p-1.5 rounded-3xl">
      {/* Search icon */}
      <FaSearch className="ml-3 text-gray-400" size={20} />
      {/* Input field for the search query */}
      <input
        type="text" // Input type is text
        placeholder="Search for books..." // Placeholder text for the input
        value={query} // Controlled input value from the query prop
        onChange={(e) => setQuery(e.target.value)} // Update query state on input change
        onKeyPress={handleKeyPress} // Handle key press events
        className="border-none outline-none flex-grow p-2" // Styling for the input
        aria-label="Search for books" // Accessibility label for screen readers
      />
      {/* Search button */}
      <button 
        onClick={onSearch} // Trigger the search function on button click
        className="ml-2 p-2 bg-gradient-to-r from-blue-200 to-gray-400 font-medium text-white rounded-r-3xl 
        hover:bg-gradient-to-l hover:from-blue-400 hover:to-blue-200 transition ease-in-out duration-200 px-6"
      >
        Search 
      </button>
    </div>
  );
};


export default SearchBar;