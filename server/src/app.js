const morgan = require('morgan');   // for showing the logs on console.
const express = require('express');
const bodyParser = require("body-parser");   // for parsing data sent through http request.
const createError = require("http-errors");
const xssClean = require('xss-clean');   //prevents cross site scripting attacks by handling malicious user inputs.
const rateLimit = require("express-rate-limit");
const {userRouter} = require("./routers/userRouter");
const { seedRouter } = require('./routers/seedRouter');
const { errorResponse, successResponse } = require('./controllers/responseController');
const app = express();
const cors = require("cors");
const productRouter = require('./routers/productRouter');

const limiter = rateLimit({
    windowMs : 15 * 60 * 1000,
    max : 100,
    message : 'too many requests given.'
});

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(limiter);
app.use(xssClean());
app.use('/api/users', userRouter);
app.use('/seed/users', seedRouter);
app.use('/api/products', productRouter);

app.get('/',(req,res) => {
    successResponse(res, {status: 200, message: 'testing successful'})
})

// client error handling, we should only use next(...) for correct response as shown in server error.
app.use((req, res, next) => {
    next(createError(404, 'Page Not Found'));
});

// server error handling -> every error comes to this.
app.use((err, req, res, next) => {
    errorResponse(res, {status: err.status, message: err.message});
});

module.exports = app;