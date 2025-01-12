import React from 'react';
import { FaTrash } from 'react-icons/fa';


const ReadingList = ({ readingList, updateBookProgress, deleteBook }) => {
  // Object to define the different progress states for books
  const progressStates = {
    WANT_TO_READ: 'Want to Read',
    CURRENTLY_READING: 'Currently Reading',
    COMPLETED: 'Completed',
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold text-blue-800">My Reading List</h2> {/* Title of the reading list */}
      {readingList.length === 0 ? ( // Check if the reading list is empty
        <p className='text-gray-400'>No books in your reading list.</p> // Message when there are no books
      ) : (
        <ul>
          {readingList.map((book) => ( // Map through the reading list to display each book
            <li key={book.isbn} className="flex flex-col sm:flex-row justify-between items-center border-b py-2">
              <span className="text-sm sm:text-base">{book.title} - {book.progress}</span> {/* Display book title and progress */}
              <div className="flex flex-col sm:flex-row items-center mt-2 sm:mt-0">
                {/* Button to mark the book as completed */}
                <button 
                  onClick={() => updateBookProgress(book.isbn, progressStates.COMPLETED)} 
                  className="bg-green-700 text-white m-1 sm:m-2 px-2 py-1 rounded text-sm sm:text-base"
                >
                  Mark as Completed
                </button>
                {/* Button to set the book status to "Want to Read" */}
                <button 
                  onClick={() => updateBookProgress(book.isbn, progressStates.WANT_TO_READ)} 
                  className="bg-gray-500 text-white m-1 sm:m-2 px-2 py-1 rounded text-sm sm:text-base"
                >
                  Want to Read
                </button>
                {/* Button to delete the book from the reading list */}
                <button 
                  onClick={() => deleteBook(book.isbn)} 
                  className="text-red-600 m-1 sm:m-2 transform transition-transform duration-200 ease-in-out hover:scale-125 active:scale-95"
                >
                  <FaTrash className="text-lg sm:text-xl" /> {/* Trash icon for deletion */}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


export default ReadingList;