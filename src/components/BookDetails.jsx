import React from 'react';


const BookDetails = React.memo(({ book }) => {
  return (
    <div className="mt-4 p-4 min-h-[100px] border rounded shadow">
      <h2 className="text-xl font-bold text-gray-700 mb-3">{book.title}</h2> {/* Book title */}
      
      <img 
        src={book.coverUrl} // Book cover image URL
        alt={`Cover of ${book.title}`} // Alt text for the image
        className="relative inset-0 w-1/2 h-full object-cover" 
      />
      
      <p><strong>Author:</strong> {book.author}</p> {/* Book author */}
      <p><strong>Publisher:</strong> {book.publisher}</p> {/* Book publisher */}
      <p><strong>Published:</strong> {book.publish_date}</p> {/* Publication date */}
      <p><strong>Pages:</strong> {book.number_of_pages}</p> {/* Number of pages */}
      <p><strong>Description:</strong> {book.description}</p> {/* Book description */}
      <p><strong>Subjects:</strong> {book.subjects}</p> {/* Subjects related to the book */}
    </div>
  );
});


export default BookDetails;