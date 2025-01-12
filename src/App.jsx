import React, { useState, useRef } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import BookCard from './components/BookCard';
import BookDetails from './components/BookDetails';
import NavBar from './components/NavBar';
import Modal from './components/Modal';
import ReadingList from './components/ReadingList';
import Footer from './components/Footer';
import { FaSpinner } from 'react-icons/fa'; 
import defaultIMG from './assets/defaultIMG.webp';

const App = () => {
  
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cache, setCache] = useState({});
  const [readingList, setReadingList] = useState([]);
  
  const readingListRef = useRef(null); // Reference to the reading list section for scrolling

  // Function to fetch books based on the search query
  const fetchBooks = async (searchQuery) => {
    if (searchQuery) {
      setLoading(true); // Set loading state to true
      setError(''); // Clear any previous error messages

      // Check if the results are already cached
      if (cache[searchQuery]) {
        setBooks(cache[searchQuery]); // Use cached results
        setLoading(false);
        return;
      }

      try {
        // Fetch books from the Open Library API
        const response = await axios.get(`https://openlibrary.org/search.json?title=${searchQuery}&limit=50`);
        const bookData = response.data.docs.map(book => ({
          title: book.title,
          author: book.author_name ? book.author_name.join(', ') : 'Unknown',
          coverUrl: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : defaultIMG,
          isbn: book.isbn ? book.isbn[0] : 'N/A',
          publisher: book.publisher ? book.publisher.join(', ') : 'N/A',
          publish_date: book.first_publish_year,
          number_of_pages: book.number_of_pages_median || 'N/A',
          description: book.description || 'No description available.',
          subjects: book.subject ? book.subject.join(', ') : 'N/A',
        }));
        
        setBooks(bookData); // Update the books state with fetched data
        setCache(prevCache => ({ ...prevCache, [searchQuery]: bookData })); // Cache the results
      } catch (error) {
        handleError(error); // Handle any errors that occur during the fetch
      } finally {
        setLoading(false); // Set loading state to false
      }
    } else {
      setBooks([]); // Clear books if no search query is provided
      setError('Please enter a search query.'); // Set error message
    }
  };

  // Function to handle errors during the fetch process
  const handleError = (error) => {
    if (error.response) {
      setError(`Error: ${error.response.status} - ${error.response.statusText}`); // Handle server errors
    } else if (error.request) {
      setError('Network error. Please check your connection.'); // Handle network errors
    } else {
      setError('Error fetching books. Please try again.'); // Handle other errors
    }
    console.error("Error fetching books:", error); // Log the error for debugging
  };

  // Function to handle search action
  const handleSearch = () => {
    fetchBooks(query); // Fetch books based on the current query
    setQuery(""); // Clear the search input
  };

  // Function to handle book card click
  const handleBookClick = (book) => {
    setSelectedBook(book); // Set the selected book for details view
  };

  // Function to close the book details modal
  const handleCloseDetails = () => {
    setSelectedBook(null); // Clear the selected book
  };

  // Object to define the different progress states for books
  const progressStates = {
    WANT_TO_READ: 'Want to Read',
    CURRENTLY_READING: 'Currently Reading',
    COMPLETED: 'Completed',
  };

  // Function to add a book to the reading list
  const addToReadingList = (book) => {
    setReadingList((prevList) => [...prevList, { ...book, progress: progressStates.WANT_TO_READ }]);

    // Scroll to the Reading list section
    if (readingListRef.current) {
      readingListRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Function to delete a book from the reading list based on its ISBN
  const deleteBook = (isbn) => {
    setReadingList((prevList) => prevList.filter((book) => book.isbn !== isbn));
  };

  // Function to update the reading progress of a book in the reading list
  const updateBookProgress = (isbn, newProgress) => {
    setReadingList((prevList) =>
      prevList.map((item) =>
        item.isbn === isbn ? { ...item, progress: newProgress } : item
      )
    );
  };

  return (
    // Main container for the application, using flexbox for layout
    <div className="flex flex-col min-h-screen">
      {/* Container for the main content, allowing it to grow and center within the viewport */}
      <div className="flex-grow container mx-auto p-4">
        {/* Navigation bar component */}
        <NavBar />
        {/* Search bar component with controlled input for querying books */}
        <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
        
        {/* Loading indicator displayed while data is being fetched */}
        {loading && (
          <div className="flex items-center justify-center mt-4">
            <FaSpinner className="animate-spin text-gray-500" size={30} /> {/* Spinner icon */}
            <p className="ml-2 text-blue-200">Loading...</p> {/* Loading text */}
          </div>
        )}
        
        {/* Error message displayed if there is an error fetching data */}
        {error && <p className="text-red-500">{error}</p>}
        
        {/* Grid layout for displaying book cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {books.length > 0 ? (
            // Mapping over the books array to render a BookCard for each book
            books.map((book, index) => (
              <BookCard 
                key={book.isbn !== 'N/A' ? book.isbn : `book-${index}`} // Unique key for each book card
                book={book} // Passing the book object to the BookCard component
                onClick={() => handleBookClick(book)} // Handling click event to show book details
                addToReadingList={addToReadingList} // Function to add book to reading list
                updateBookProgress={updateBookProgress} // Function to update book progress
                defaultIMG={defaultIMG} // Default image for the book
              />
            ))
          ) : (
            // Message displayed when there are no books and not loading
            !loading && (
              <p className="text-center text-gray-500 text-lg font-medium mt-4 p-4 border border-gray-300 rounded-lg bg-gray-100">
                <span className="mr-2">🔍</span> Search your book now!
              </p>
            )
          )}
        </div>
        
        {/* Modal for displaying selected book details */}
        {selectedBook && (
          <Modal onClose={handleCloseDetails}>
            <BookDetails book={selectedBook} /> {/* Displaying details of the selected book */}
          </Modal>
        )}
        
        {/* Reference for the reading list section */}
        <div ref={readingListRef}>
          {/* Reading list component displaying the user's reading list */}
          <ReadingList 
            readingList={readingList} // Passing the reading list data
            updateBookProgress={updateBookProgress} // Function to update book progress
            deleteBook={deleteBook} // Function to delete a book from the reading list
          />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default App;