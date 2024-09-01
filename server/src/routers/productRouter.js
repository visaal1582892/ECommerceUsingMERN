const express = require("express");
const { validateProductRegistration } = require("../validators/auth");
const runValidation = require("../validators");
const { addProduct, fetchSellerProducts, fetchAllProducts, getCartProducts } = require("../controllers/productController");
const productRouter = express.Router();
const upload = require("../middlewares/uploadImage");

productRouter.post('/addProduct', upload.single('image'), validateProductRegistration, runValidation, addProduct);
productRouter.post('/fetchSellerProducts', fetchSellerProducts);
productRouter.get("/fetchAllProducts", fetchAllProducts);
productRouter.post('/getCartProducts', getCartProducts);

module.exports = productRouter;