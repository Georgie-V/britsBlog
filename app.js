const express = require('express');
const app = express()
const mongoose = require('mongoose')
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("express-flash");
const methodOverride = require('method-override');
const logger = require('morgan');
const connectDB = require("./config/database");
const adminRoutes = require('./routes/admin');

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// PORT to listen on (streamline later)
const port = process.env.PORT || 4000

// Passport config
require("./config/passport")(passport);

// Connect to MongoDb
connectDB();

//Using EJS for views
app.set("view engine", "ejs");

// Setup static folder
app.use(express.static('public'))

// Parse JSON
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

// // Method override
// app.use(methodOverride(function (req, res) {
//     if (req.body && typeof req.body === 'object' && '_method' in req.body) {
//       // look in urlencoded POST bodies and delete it
//       let method = req.body._method
//       delete req.body._method
//       return method
//     }
//   }))

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_STRING }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

// Routes
app.use('/favicon.ico', express.static('/public/images/favicon.ico'));
app.use('/admin', adminRoutes)
app.use('/', require('./routes/index'))


// PORT to listen on
app.listen(port, () => console.log(`App is running on port ${port}`))