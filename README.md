# My Book Library Server

This is a simple Node.js server for managing a book library. It provides various routes for creating, deleting, loaning out, returning, and updating books, as well as routes for user authentication.

## Deployment

This project is deployed on [Render](https://render.com/). You can access the deployed server at [https://bookstore-api-8s96.onrender.com](https://bookstore-api-8s96.onrender.com/).

## Routes

The server exposes the following routes:

### Users

- **Create User**
  - Route: `/createUser`
  - Method: POST
  - Description: Creates a new user.
  - Request Body: JSON object containing user data (e.g., userId,username, password).
  
- **Authenticate User**
  - Route: `/authenticateUser`
  - Method: POST
  - Description: Authenticates a user.
  - Request Body: JSON object containing user credentials (e.g., username, password).

- **Get All Users**
  - Route: `/getAllUsers`
  - Method: GET
  - Description: Retrieves all users.

### Books

- **Create Book**
  - Route: `/createBook`
  - Method: POST
  - Description: Creates a new book.
  - Request Body: JSON object containing book data (e.g., title, author).

- **Delete Book**
  - Route: `/deleteBook`
  - Method: DELETE
  - Description: Deletes a book.
  - Request Body: JSON object containing book ID.

- **Loan Out Book**
  - Route: `/loanOutBook`
  - Method: POST
  - Description: Loans out a book to a user.
  - Request Body: JSON object containing book ID and user ID.

- **Return Book**
  - Route: `/returnBook`
  - Method: POST
  - Description: Returns a book that was loaned out.
  - Request Body: JSON object containing book ID.

- **Update Book**
  - Route: `/updateBook`
  - Method: PUT
  - Description: Updates book information.
  - Request Body: JSON object containing updated book data.

## Getting Started

To run the server locally:

1. Clone this repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Install dependencies by running `npm install`.
4. Start the server by running `node index.js`.
5. The server will start running on `http://localhost:3000`.

## Dependencies

This project uses Node.js built-in modules only. No external dependencies are required.

## File Structure

- `index.js`: Entry point of the server application.
- `routes/`: Directory containing route handlers for users and books.
- `data/`: Directory containing JSON files for storing user and book data.

