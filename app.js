require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('express-async-errors');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('./routes/index');
const ApiError = require('./utils/ApiError');
const { globalErrorController } = require('./controllers');

require('./DB/DB');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(mongoSanitize());
// const apiLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100
// });
app.use(xss());
// app.use(apiLimiter);
app.use(compression());
app.use('/api/v1', routes);

// catch 404 and forward to error handler
app.all('*', (req, res, next) => {
  return next(new ApiError('Note Found', 404));
});

app.use(globalErrorController);
module.exports = app;
