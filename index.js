const http = require('http');
const { createUser, authenticateUser, getAllUsers } = require('./routes/users');
const { createBook, deleteBook, loanOutBook, returnBook, updateBook } = require('./routes/books');

// Create HTTP server
const server = http.createServer((req, res) => {
    if (req.url === '/createUser' && req.method === 'POST') {
        createUser(req, res);
    } else if (req.url === '/authenticateUser' && req.method === 'POST') {
        authenticateUser(req, res);
    } else if (req.url === '/getAllUsers' && req.method === 'GET') {
        getAllUsers(req, res);
    } else if (req.url === '/createBook' && req.method === 'POST') {
        createBook(req, res);
    } else if (req.url === '/deleteBook' && req.method === 'DELETE') {
        deleteBook(req, res);
    } else if (req.url === '/loanOutBook' && req.method === 'POST') {
        loanOutBook(req, res);
    } else if (req.url === '/returnBook' && req.method === 'POST') {
        returnBook(req, res);
    } else if (req.url === '/updateBook' && req.method === 'PUT') {
        updateBook(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

