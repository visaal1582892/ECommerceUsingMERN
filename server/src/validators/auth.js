const { body } = require("express-validator");
const validateUserRegistration = [
    body('userType')
        .notEmpty()
        .withMessage('user type should not be empty'),
    body('name')
        .trim()
        .notEmpty()
        .withMessage("name should not be empty")
        .isLength({min: 3, max: 50})
        .withMessage("length of name should be at least 3 characters and at most 50 characters."),
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email should not be empty')
        .isEmail()
        .withMessage("Invalid email"),
    body('password')
        .trim()
        .notEmpty()
        .withMessage("password should not be empty")
        // .matches()
        .isLength({min: 6})
        .withMessage("length of name should be at least 6 characters"),
    body('phone')
        .trim()
        .notEmpty()
        .withMessage("phone number must be given")
        .isLength({min: 10, max: 10})
        .withMessage("phone number must 10 characters"),
    body('address')
        .trim()
        .notEmpty()
        .withMessage("address must be given")
        .isLength({min: 6})
        .withMessage("address must be at least 6 characters"),
    body('image')
        // .custom((value, {req}) => {
        //     if(!req.file) {
        //         throw new Error("user image is required");
        //     }
        //     return true;
        // })
        .optional(),
    body('userType')
        .notEmpty()
        .withMessage('user type must be given'),
];

const validateUserLogin = [
    body('userType')
        .notEmpty()
        .withMessage('User type must be given'),
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email should not be empty')
        .isEmail()
        .withMessage("Invalid email"),
    body('password')
        .trim()
        .notEmpty()
        .withMessage("password should not be empty")
        // .matches()
        .isLength({min: 6})
        .withMessage("length of name should be at least 6 characters"),
];

validateProductRegistration = [
    body('sellerId')
        .notEmpty()
        .withMessage('seller id should not be empty'),
    body('category')
        .notEmpty()
        .withMessage('category should not be empty'),
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name of product must be given')
        .isLength({min: 3, max: 40})
        .withMessage('name of product should contain at least 3 letters and at most 40 letters'),
    body('price')
        .isFloat({ min: 0 })
        .withMessage('Price must be a positive number')
        .custom(value => {
          if (!/^\d+(\.\d{1,2})?$/.test(value)) {
            throw new Error('Price must have at most two decimal places');
          }
          return true;
        }),
    body('image')
        // .notEmpty()
        // .withMessage('Image must be given'),
        .optional(),
];

module.exports = { validateUserRegistration, validateUserLogin, validateProductRegistration };