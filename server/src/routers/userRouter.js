const express = require("express");
const { getUsers, processRegister, processLogin, activateUserAccount, updateUserById, verifyLoginToken, getUserImage, addToCart, removeFromCart } = require("../controllers/userController");
const upload = require("../middlewares/uploadImage");
const { validateUserRegistration, validateUserLogin } = require("../validators/auth");
const runValidation = require("../validators");
const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.post('/processRegister', upload.single('image'), validateUserRegistration, runValidation, processRegister);
userRouter.post('/processLogin', validateUserLogin, runValidation, processLogin);
userRouter.post("/verify",activateUserAccount);
// userRouter.put('/:id', upload.single('image'), updateUserById);
userRouter.post("/verifyLoginToken",verifyLoginToken);
userRouter.post('/getUserImage', getUserImage);
userRouter.put('/addToCart', addToCart);
userRouter.put('/removeFromCart', removeFromCart);
module.exports = {userRouter};