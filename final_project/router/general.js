const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

function usernameExists(username) {
  return users.includes(username);
}

function saveUserToDatabase(username, password) {
  users.push(username);
}



public_users.post("/register", (req, res) => {
  const { username, password } = req.body;
  // Check if username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  // Check if the username already exists in the database (pseudocode)
  if (usernameExists(username)) {
    return res.status(400).json({ message: "Username already exists" });
  }

  // Save the new user to the database (pseudocode)
  saveUserToDatabase(username, password);

  // Return success message
  return res.status(201).json({ message: "User registered successfully" });
});

//TODO: TASK 10
function fetchBooks() {
  return new Promise((resolve, reject) => {
    // Simulate asynchronous operation (fetching books)
    setTimeout(() => {
      // Resolve the promise with the array of books
      resolve(books);
    }, 1000); // Simulated delay of 1 second
  });
}

// Route to get the list of books
public_users.get('/', function (req, res) {
  // Call the function to fetch books using Promise callbacks
  fetchBooks()
    .then(books => {
      // Return the list of books in the response
      res.status(200).json({ message: books });
    })
    .catch(error => {
      // Handle errors if any
      console.error('Error fetching books:', error);
      res.status(500).json({ error: 'Failed to fetch books' });
    });
});


//TODO: TASK 11
// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  // i will use Promise to fetch the books
  const isbn = req.params.isbn;
  fetchBooks()
    .then(books => {
      // Return the list of books in the response
      res.status(200).json({ message: books[isbn] });
    })
    .catch(error => {
      // Handle errors if any
      console.error('Error fetching books:', error);
      res.status(500).json({ error: 'Failed to fetch books' });
    });
});

//TODO: TASK 12
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  //Write your code here
  const author = req.params.author;
  fetchBooks().then(books => {
  for (let book in books) {
    if (books[book].author === author) {
      return res.status(300).json({ message: books[book] });
    }
  }
}).catch(error => {
  // Handle errors if any
  console.error('Error fetching books:', error);
  res.status(500).json({ error: 'Failed to fetch books' });
}
);
});

//TODO: TASK 13
// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  //Write your code here
  const title = req.params.title;
  // using Promise to fetch the books
  fetchBooks().then(books => {
    // Return the list of books in the response

    for (let book in books) {
      if (books[book].title === title) {
        return res.status(300).json({ message: books[book] });
      }
    }
  }).catch(error => {
    // Handle errors if any
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
  );
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  //Write your code here
  const review = req.params.isbn;
  return res.status(300).json({
    message:
      books[review] ? books[review].review : "Review not found"
  });

});

module.exports.general = public_users;
