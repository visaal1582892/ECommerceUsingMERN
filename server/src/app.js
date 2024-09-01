const morgan = require('morgan');
const express = require('express');
const bodyParser = require("body-parser");
const createError = require("http-errors");
const xssClean = require('xss-clean');
const rateLimit = require("express-rate-limit");
const {userRouter} = require("./routers/userRouter");
const { seedRouter } = require('./routers/seedRouter');
const { errorResponse, successResponse } = require('./controllers/responseController');
const app = express();
const cors = require("cors");
const productRouter = require('./routers/productRouter');

const limiter = rateLimit({
    windowMs : 5 * 60 * 1000,
    max : 500,
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

// const isLoggedIn = (req, res, next) => {
//     loggedIn=true;
//     if(loggedIn) {
//         next();
//     }else{
//         return res.status(401).json({
//             message: "please login first"
//         });
//     }
// }

// app.use(isLoggedIn);

app.get('/',(req,res) => {
    successResponse(res, {status: 200, message: 'testing successful'})
})

// client error handling, we should only use next(...) for correct response as shown in server error.
app.use((req, res, next) => {
    next(createError(404, 'error occurred'));
});

// server error handling -> every error comes to this.
app.use((err, req, res, next) => {
    errorResponse(res, {status: err.status, message: err.message});
});

module.exports = app;