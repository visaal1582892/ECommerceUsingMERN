const User = require("../models/userModel");
const Product = require("../models/productModel");
const tempImageModel = require('../models/tempImageModel');
const createError = require("http-errors");
const { successResponse, errorResponse } = require("./responseController");
const mongoose = require("mongoose");
const findUserById = require("../services/findUserById");
const { createJSONWebToken } = require("../helpers/jsonwebtoken");
const { jsonActivationKey, clientUrl } = require("../secret");
const { emailWithSendGrid } = require("../helpers/email");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');


const getUsers = async (req,res,next) => {
    try {
        const search = req.query.search ||'';
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 1;
        const searchRegExp = new RegExp('.*'+search+'.*', 'i');
        const filter = {
            isAdmin : {$ne: true},
            $or: {
                name: {$regex: searchRegExp},
                email: {$regex: searchRegExp},
                address: {$regex: searchRegExp},
            }
        }
        const options = {password: 0};
        const users = await User.find(filter, options)
            .limit(limit)
            .skip((page-1) * limit);
        const count = await User.find(filter).countDocuments();
        console.log(count);
        successResponse(res, {status: 200, message: "users returned successfully",
        payload: {users: users,
        pagination: {
            totalPages: Math.ceil(count/limit),
            currentPage: page,
            previousPage: (page-1) > 0 ? page-1 : null,
            nextPage: page+1 <= Math.ceil(count/limit) ? page+1 : null,
        }}});
    }
    catch(error) {
        next(error);
    }
}

const getUser = async (req, res, next) => {
    const id = req.params.id;
    findUserById(res, next, id);
}

const deleteUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deletedUser = await User.findByIdAndDelete({_id : id, isAdmin : false})
        return successResponse(res, {status: 200, message: 'user deleted successfully',
            payload: {user: deletedUser,}
        })
    }
    catch(error){
        next(error);
    }
}

const processRegister = async (req, res, next) => {
    try{const { name, email, password, phone, address, image, userType } = req.body;
    // if(!req.file || !req.file.buffer){
    //     return errorResponse(res,{status: 404, message: "file not given"});
    // }
    // const imageBufferString = req.file.buffer.toString('base64');
    // const imageBufferString = image.buffer.toString('base64');
    const userExists = await User.exists({email: email});
    if(userExists){
        throw createError(409, 'user already exists, please sign in.')
    }
    // const base64Image = await imageToBase64(req.file);
    try{
        const result = await tempImageModel.deleteMany({});}
      catch(err){
        console.log(err);
      }
    await tempImageModel.create({image: image});
    const token = createJSONWebToken({userType, name, email, password, phone, address}, jsonActivationKey, '10m');
    const emailData = {
        email,
        subject: 'Account Activation Email',
        html: `
        <h2>Hello ${name} !</h2>
        <p>Click here to <a href = "${clientUrl}/activate/${token}" target = "_blank" >activate your account</a></p>`
    }
    try{
        const info = await emailWithSendGrid(emailData)
    }
    catch(error){
        next(error);
        return;
    }
    return successResponse(res,{status: 200, message: 'please open your email for completing your registration process.',
    payload: {token: token}
    })
    }catch(error){
        next(error);
    }
}

const activateUserAccount = async (req, res, next) => {
    try{
        const token = await req.body.token;
        if(!token){throw createError(404, "token not given");}
        const decodedData = await jwt.verify(token, jsonActivationKey);
        if(!decodedData){throw createError(404, 'token not found');}
        const exists = await User.exists({email: decodedData.email});
        if(exists){throw createError(401, "user already exists in db");}
        const imageRow = await tempImageModel.findOne();
        decodedData.image = await imageRow.image;
        console.log(decodedData);
        const user = await User.create(decodedData);
        return successResponse(res,{status: 200, message: 'user was registered successfully', 
            payload: {
                token: token,
            }
        })
    }
    catch(error){
        next(error);
        return;
    }
}

const updateUserById = async (req, res, next) => {
    try{
        const userId = await req.params.id;
    updateOptions = {new: true, runValidators: true, context: 'query'};
    let updates = await {};
    if(req.body.name){
        updates.name = await req.body.name;
    }
    if(req.body.password){
        updates.password = req.body.password;
    }
    if(req.body.phone){
        updates.phone = req.body.phone;
    }
    if(req.body.address){
        updates.address = req.body.address;
    }
    image = await req.file;
    if(image){
        updates.image = image.buffer.toString('base64');
    }
    const updatedUser = await User.findByIdAndUpdate(userId, updates, updateOptions);
    return successResponse(res,{status:200, message: 'user updated successfully', payload: {updatedUser: updatedUser}})
    }
    catch(error){
        return errorResponse(res, {status: 404, message: error.message});
    }
}

const processLogin = async(req, res, next) => {
    const userType = await req.body.userType;
    const emailGiven = await req.body.email;
    const password = await req.body.password;
    const filter = await {email: emailGiven, userType: userType};
    const user = await User.findOne(filter);
    if(!user){
        return errorResponse(res, {status: 404, message: 'User with given email not registered yet'});
    }
    else{
        const match = await bcrypt.compare(password, user.password)
        if(match){
            const { _id, userType, name, email, address, phone, cart } = await user;
            const token = await createJSONWebToken({_id, userType, name, email, address, phone, cart}, jsonActivationKey, '1h');
            return successResponse(res, {status: 200, message: 'login successful', payload: {token: token}});
        }
        else{
            return errorResponse(res, {status: 404, message: 'incorrect password'});
        }
    }
}

const verifyLoginToken = async (req, res, next) => {
    const token = await req.body.token;
    if(token){
        const decodedData = await jwt.verify(token, jsonActivationKey);
        return successResponse(res, {status: 200, message: 'token verification successful', payload: {data: decodedData}});
    }
    else{
        return errorResponse(res, {status: 404, message: 'token not available'});
    }
}

const getUserImage = async (req, res, next) => {
    const email = await req.body.email;
    const filter = await {email: email};
    const user = await User.findOne(filter);
    const base64Image = await user.image;
    if(user){
        return successResponse(res, {status: 200, message: 'user Image returned successfully',
            payload: {
                imageSrc: base64Image,
            }
        })
    }
    else{
        return errorResponse(res, {status: 404, message: 'user not available'});
    }
}

const addToCart = async (req, res, next) => {
    const productId = await req.body.productId;
    const userId = await req.body.userId;
    const user = await User.findById(userId);
    if(user){
        if (!user.cart.includes(productId)) {
            user.cart.push(productId);
        }
        await user.save();
        return successResponse(res, {status: 200, message: 'user updated successfully', payload: {user}})
    }
    else{
        return errorResponse(res, {status: 404, message: 'user not available'});
    }
}

const removeFromCart = async (req, res, next) => {
    const productId = await req.body.productId;
    const userId = await req.body.userId;
    const user = await User.findById(userId);
    if(user){
        if (user.cart.includes(productId)) {
            let index = await user.cart.indexOf(productId);
            if (index !== -1) {
                user.cart.splice(index, 1);
            }
        }
        await user.save();
        return successResponse(res, {status: 200, message: 'user updated successfully', payload: {user}})
    }
    else{
        return errorResponse(res, {status: 404, message: 'user not available'});
    }
}

module.exports = {getUsers, getUser, deleteUserById, processRegister, processLogin, activateUserAccount, updateUserById, verifyLoginToken, getUserImage, addToCart, removeFromCart}