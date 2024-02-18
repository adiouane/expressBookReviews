const express = require('express'); // Importing express module to the file from node_modules
const jwt = require('jsonwebtoken'); // Importing jsonwebtoken module to the file from node_modules
const session = require('express-session') // Importing express-session module to the file from node_modules
const customer_routes = require('./router/auth_users.js').authenticated; // Importing authenticated function from auth_users.js file
const genl_routes = require('./router/general.js').general; // Importing general function from general.js file

const app = express(); // Creating a new express application and saving it to the app variable

app.use(express.json()); // Using the express.json() middleware to parse the request body

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
  //Write the authenication mechanism here
  const accessToken = req.headers.authorization;
  console.log(accessToken);
  if (accessToken) {
    next();
  } else {
    // If no access token is provided, return an error response
    res.status(401).json({ error: 'Access token is required' });
  }
});

 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
