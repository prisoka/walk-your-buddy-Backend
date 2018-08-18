var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dogsRouter = require('./routes/dogs');
var requestsRouter = require('./routes/requests');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://wyb.herokuapp.com/");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/dogs', dogsRouter);
app.use('/api/requests', requestsRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  error = req.app.get('env') === 'development' ? {error: {message: err.message}} : {};

  // render the error page
  res.status(err.status || 500).send(error)
});

module.exports = app;
