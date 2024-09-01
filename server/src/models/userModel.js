const {Schema, model} = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
    userType: {
        type: String,
        required: [true, 'user type must be given'],
    },
    name: {
        type: String,
        required: [true, 'name must be given'],
        maxlength: [50, 'length of user name cannot exceed 50'],
        minlength: [3, 'length of user name cannot be less than 3'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'email must be given'],
        trim: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: (value) => {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: 'enter valid email id'
        },

    },
    password: {
        type: String,
        required: [true, 'password must be given'],
        minlength: [6, 'length of user name cannot be less than 3'],
        set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
    },
    image: {
        type: String,
        required: [true, 'user image is required'],
    },
    address: {
        type: String,
        required: [true, 'address must be given']
    },
    phone: {
        type: String,
        required: [true, 'phone number must be given']
    },
    cart: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Product',
        }],
        default: [],
    }
},
{timestamps: true});

const User = model('User', userSchema);
module.exports = User;