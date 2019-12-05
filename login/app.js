  
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
var path = require('path');

// const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();
// Passport Config
require('./config/passport')(passport);

// EJS
// app.use(expressLayouts);
// app.set('view engine', 'ejs');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Connect flash
app.use(flash());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:admin@cinema-9zo1y.mongodb.net/cinema?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology: true
})
mongoose.connection
  .then(()=>console.log('DB connected!'))
  .catch(err=>console.log(err.message))
