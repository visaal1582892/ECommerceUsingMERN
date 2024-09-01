const {Schema, model} = require('mongoose');

const productSchema = new Schema({
    sellerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        // required: true,
    },
    category: {
        type: String,
        required: [true, 'category must be given'],
    },
    name: {
        type: String,
        required: [true, 'name must be given'],
        maxlength: [40, 'length of product name cannot exceed 50'],
        minlength: [3, 'length of product name cannot be less than 3'],
        trim: true,
    },
    price: {
        type: Number,
        min: 0,
    },
    image: {
        type: String,
        // required: [true, 'product image must be given'],
    },
});

const Product = model('Product', productSchema);

module.exports = Product;