const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./models');

const indexRouter = require('./routes/index');
const booksRouter = require('./routes/books');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/books', booksRouter);

// test connection and sync the database
(async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await db.sequelize.sync();
    console.log('The database has been synced successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}) ();

// catch 404 and forward to error handler
app.use( (req, res, next) => {
  const err = new Error("Sorry! We couldn't find the page you were looking for.");
  err.status = 404;
  res.render('page-not-found', { err, title: "Page Not Found" });
  next(err);
});

// error handler
app.use( (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.message = "Sorry! There was an unexpected error on the server.";
  console.log(`${res.status}\n${res.message}`)
  res.render('error', { res, title: "Server Error" });
});

module.exports = app;
