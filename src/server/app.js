var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { v4: uuidv4 } = require('uuid');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

//connect to databse
const connectToMongoose = require('./database/connect');
const Data = require('./database/model');
connectToMongoose();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// 1. get
app.delete('/signIn', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const queryResult = await Data.findOne({ email: email });
  if (queryResult && queryResult.password === password) {
    res.status('201').json({
      message: 'Sign In Successfully',
    });
    return;
  }

  res.status('400').json({
    message: 'Sign In failed',
  });
  return;
});

// add data
app.post('/signUp', async (req, res) => {
  if (req.body) {
    const data = new Data({
      email: req.body.email,
      password: req.body.password,
      id: uuidv4(),
    });

    const newData = await data.save();
    if (newData === data) {
      res.status(202).json({
        message: 'Sign Up Successfully',
        status: '201',
        newData: {
          email: newData.email,
          password: newData.password,
          id: newData.id,
        },
      });
      return;
    }

    res.status('400').json({
      error: 'failed',
      message: 'Sign Up failed',
    });
  }

  //error handling
  res.status(404).json({
    error: 'failed',
    message: 'Sign Up failed',
  });
});

// PUT, modify data
app.put('/changePass', async (req, res) => {
  if (req.body) {
    const email = req.body.email;
    const queryResult = await Data.findOne({ email: email });
    const { modifiedCount } = await queryResult.updateOne({
      password: req.body.password,
    });

    if (modifiedCount) {
      res.status('203').json({
        message: 'Change Password Successfully',
      });
      return;
    }

    res.status('400').json({
      message: 'Change Password Failed',
    });
    return;
  }

  //error handling
  res.status(402).json({
    error: 'failed',
    message: 'Change Password Failed',
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
