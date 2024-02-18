const express = require('express'); // Importing express module to the file from node_modules
const jwt = require('jsonwebtoken'); // Importing jsonwebtoken module to the file from node_modules
let books = require("./booksdb.js"); // Importing booksdb.js file to the file
const regd_users = express.Router(); // Creating a new router object to handle requests from the /auth_users path
const crypto = require('crypto');


let users = [];

const isValid = (username) => {
  // Check if the username is valid (e.g., not empty or undefined)
  return username && username.trim() !== '';
};

// Login endpoint
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Check if username and password are provided
  if (!isValid(username) || !isValid(password)) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  // check if the user is registered
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === username && users[i].password === password) {
      return res.status(200).json({ message: "Login successful" });
    }
  }

  const secretKey =  "adiouaneSecretKey";

  // Generate JWT token
  const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
  console.log(token);

  // Return token to client
  res.status(200).json({ token });
});


// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  console.log(req.params.isbn);
  console.log(req.query.review);
  console.log(req.body);

  // search for the book with the isbn
  const isbn = req.params.isbn;
  const review = req.query.review;
  const user = req.body.username;
  if (books[isbn]) {
    // Ensure the reviews array exists for the book
    if (!Array.isArray(books[isbn].reviews)) {
      books[isbn].reviews = []; // Initialize reviews as an empty array if it's not already
    }
    // Append the review to the existing reviews
    books[isbn].reviews.push({ user, review });
    // Send success response
    return res.status(200).json({ message: "Review added successfully" });
  } else {
    // Send error response if the book is not found
    return res.status(404).json({ message: "Book not found" });
  }


});

// delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  //Write your code here
  console.log(req.params.isbn);
  console.log(req.query.review);
  console.log(req.body);

  // search for the book with the isbn
  const isbn = req.params.isbn;
  const review = req.query.review;
  const user = req.body.username;
  if (books[isbn]) {
    // Ensure the reviews array exists for the book
    if (!Array.isArray(books[isbn].reviews)) {
      books[isbn].reviews = []; // Initialize reviews as an empty array if it's not already
    }
    // Append the review to the existing reviews
    books[isbn].reviews = books[isbn].reviews.filter((rev) => rev.review !== review && rev.user !== user);
    // Send success response
    return res.status(200).json({ message: "Review deleted successfully" });
  } else {
    // Send error response if the book is not found
    return res.status(404).json({ message: "Book not found" });
  }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
