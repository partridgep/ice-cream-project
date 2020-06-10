const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const port = process.env.PORT || '3000'; 

// We'll need to load the env vars
require('dotenv').config()

const indexRouter = require('./routes/index');
const flavorsRouter = require('./routes/flavors');
const iceCreamRouter = require('./routes/icecreams');

// Set up express app
const app = express();

// connect to the database with Mongoose
require('./config/database');
require('./config/passport');


// Configure the app with app.set()
app.set('view engine', 'ejs');

// Mount middleware with app.use()
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// TODO Add session middleware here
app.use(session({
    secret: 'Cookie Dough!',
    resave: false,
    saveUninitialized: true
}));
// TODO Add passport middleware here
app.use(passport.initialize());
app.use(passport.session());

// Mount routes with app.use()
app.use('/', indexRouter);
app.use('/flavors', flavorsRouter);
app.use('/:id', iceCreamRouter);

// Tell App to listen
app.listen(port, function() {
    console.log(`Express is listening on port:${port}`);
});