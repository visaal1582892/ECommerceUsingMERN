const Product = require('../models/productModel');
const User = require("../models/userModel");
const mongoose = require("mongoose");
const { successResponse, errorResponse } = require('./responseController');

const addProduct = async(req, res, next) => {
    try{
        const {sellerId, category, name, price, image} = await req.body;
        const product = await Product.create({sellerId, category, name, price, image});
        return successResponse(res, {status: 200, message: 'product registered Successfully', 
            payload: {product: product,}
        });
    }
    catch(err){
        // next(err);
        return errorResponse(res, {status: 404, message:'cannot add product'});
    }
}

const fetchSellerProducts = async (req, res, next) => {
    const sellerId = await req.body.sellerId;
    try{
        const sellerProducts = await Product.find({sellerId: sellerId});
        return successResponse(res, {status:200, message: 'products returned successfully', payload: {
        sellerProducts: sellerProducts,
    }});
    }
    catch(err){
        next(err);
    }
}

const fetchAllProducts = async (req, res, next) => {
    try{
        const products = await Product.find({});
        return successResponse(res, {status:200, message: 'products returned successfully', payload: {
        products: products,
    }});
    }
    catch(err){
        next(err);
    }
}

const getCartProducts = async (req, res, next) => {
    const userId = await req.body.userId;
    const user = await User.findById(userId).populate('cart');
    if(user){
        return successResponse(res, {status: 200, message: 'cart products returned successfully', payload: {
            cartProducts: user.cart,
        }});
    }
    else{
        return errorResponse(res, {status: 404, message: 'user not available'});
    }
}

module.exports = {addProduct, fetchSellerProducts, fetchAllProducts, getCartProducts};