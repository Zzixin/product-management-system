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
const { User, Product } = require('./database/model.js');
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

// 1. sign in find data
app.post('/signIn', async (req, res) => {
  if (req.body) {
    const email = req.body.email;
    const password = req.body.password;
    const queryResult = await User.findOne({ email: email });
    if (queryResult && queryResult.password === password) {
      res.status('200').json({
        status: 200,
        message: 'Sign In Successfully',
      });
      return;
    }

    res.status('400').json({
      error: 'Bad Request',
      message: 'Sign Up failed',
    });
  }

  //error handling
  res.status(404).json({
    error: 'User Not Found',
    message: 'Sign Ip failed',
  });
});

// add data
app.post('/signUp', async (req, res) => {
  if (req.body) {
    const data = new User({
      email: req.body.email,
      password: req.body.password,
      id: uuidv4(),
    });

    const newData = await data.save();
    if (newData === data) {
      res.status('200').json({
        message: 'Sign Up Successfully',
        status: 200,
        newData: {
          email: newData.email,
          password: newData.password,
          id: newData.id,
        },
      });
      return;
    }

    res.status('400').json({
      error: 'Bad Request',
      message: 'Sign Up failed',
    });
  }

  //error handling
  res.status(404).json({
    error: 'User Not Found',
    message: 'Sign Up failed',
  });
});

// PUT, modify data
app.put('/changePass', async (req, res) => {
  if (req.body) {
    const email = req.body.email;
    const queryResult = await User.findOne({ email: email });
    const { modifiedCount } = await queryResult.updateOne({
      password: req.body.password,
    });

    if (modifiedCount) {
      res.status('200').json({
        status: 200,
        message: 'Change Password Successfully',
      });
      return;
    }

    res.status('400').json({
      error: 'Bad Request',
      message: 'Change Password Failed',
    });
    return;
  }

  //error handling
  res.status('404').json({
    error: 'User Not Found',
    message: 'Change Password Failed',
  });
});

// product events
//1. (GET method) => return all todos in the mock database
app.get('/allProducts', async (_, res) => {
  const productDataBase = await Product.find({});
  const productList = productDataBase.map(
    ({
      name,
      description,
      category,
      price,
      choose,
      quantity,
      imageURL,
      id,
    }) => {
      return {
        name,
        description,
        category,
        price,
        choose,
        quantity,
        imageURL,
        id,
      };
    }
  );
  res.json(productList);
});

app.post('/addProduct', async (req, res) => {
  if (req.body) {
    const item = new Product({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      choose: req.body.choose,
      quantity: req.body.quantity,
      imageURL: req.body.imageURL,
      id: uuidv4(),
    });

    const newItem = await item.save();
    if (newItem === item) {
      res.status('200').json({
        message: 'create product Successfully',
        status: 200,
      });
      return;
    }

    res.status('400').json({
      error: 'Bad Request',
      message: 'Create Product Failed',
    });
  }

  //error handling
  res.status(404).json({
    error: 'Product Not Found',
    message: 'Create Product Failed',
  });
});

// PUT, modify product detail
app.put('/editProduct', async (req, res) => {
  if (req.body) {
    const id = req.body.id;
    const queryResult = await Product.findOne({ id: id });
    const { modifiedCount } = await queryResult.updateOne({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      choose: req.body.choose,
      quantity: req.body.quantity,
      imageURL: req.body.imageURL,
    });

    if (modifiedCount) {
      res.status('200').json({
        status: 200,
        message: 'edit product Successfully',
      });
      return;
    }

    res.status('400').json({
      error: 'Bad Request',
      message: 'edit product failed',
    });
    return;
  }

  //error handling
  res.status('404').json({
    error: 'Product Not Found',
    message: 'Edit Product Failed',
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
