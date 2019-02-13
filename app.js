require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session')
const passport = require('passport');
const passportInit = require('./config/passport')
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('errorhandler')
const socketio = require('socket.io')

// Routes 
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth')

// Initiate our app
const app = express();

// Create server for socket.io
const server = require('http').Server(app)



//
require('./config/passport')
require('./db/db')


// Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

// Configure isProduction constiable
const isProduction = process.env.NODE_ENV === 'production';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors())
app.use(require('morgan')('dev'))
app.use(bodyParser.json())
app.use(session({
  secret: 'vegan',
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize());
passportInit()

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

const io = socketio(server)
app.set('io', io)



if(!isProduction) {
  app.use(errorHandler())
}

app.use('/', authRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

server.listen(3030)

module.exports = app;
