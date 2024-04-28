const fs = require('fs');

let books = [];

// Load books data from file
try {
    books = JSON.parse(fs.readFileSync('data/books.json'));
} catch (error) {
    console.log('Error reading books data from file:', error);
}

// Function to save books data to file
function saveBooksToFile() {
    fs.writeFileSync('data/books.json', JSON.stringify(books, null, 2));
}

const createBook = (req, res) => {
  let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const newBook = JSON.parse(body);
            books.push(newBook);
            saveBooksToFile();
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Book created successfully', book: newBook }));
        });
}

const deleteBook = (req, res) => {
  let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const bookToDelete = JSON.parse(body);
            books = books.filter(book => book.id !== bookToDelete.id);
            saveBooksToFile();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Book deleted successfully' }));
        });
}

const loanOutBook = (req, res) => {
  let body = '';
  req.on('data', chunk => {
      body += chunk.toString();
  });
  req.on('end', () => {
      const loanInfo = JSON.parse(body);
      const { bookId, userId } = loanInfo;
      const bookIndex = books.findIndex(book => book.id === bookId);
      if (bookIndex !== -1 && !books[bookIndex].isLoanedOut) {
          books[bookIndex].isLoanedOut = true;
          books[bookIndex].loanedTo = userId;
          saveBooksToFile();
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Book loaned out successfully' }));
      } else {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Book not available for loan' }));
      }
  });
}

const returnBook = (req, res) => {
  let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const returnInfo = JSON.parse(body);
            const { bookId } = returnInfo;
            const bookIndex = books.findIndex(book => book.id === bookId);
            if (bookIndex !== -1 && books[bookIndex].isLoanedOut) {
                books[bookIndex].isLoanedOut = false;
                books[bookIndex].loanedTo = null;
                saveBooksToFile();
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Book returned successfully' }));
            } else {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Book cannot be returned' }));
            }
        });
}

const updateBook = (req, res) => {
  let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const updatedBook = JSON.parse(body);
            const bookIndex = books.findIndex(book => book.id === updatedBook.id);
            if (bookIndex !== -1) {
                books[bookIndex] = updatedBook;
                saveBooksToFile();
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Book updated successfully', book: updatedBook }));
            } else {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Book not found' }));
            }
        });
}



module.exports = {createBook, deleteBook, loanOutBook, updateBook, returnBook}

