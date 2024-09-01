const { successResponse } = require("../controllers/responseController");
const User = require("../models/userModel");
mongoose = require("mongoose");
createError = require('http-errors')

const findUserById = async (res, next, id) => {
    try{
        const options = {password: 0};
        const user = await User.findById(id, options);
        successResponse(res, {status: 200, message:"required user is returned",
        payload: {
            user: {user},
        }
        })
    }
    catch(error) {
        if(error instanceof mongoose.Error){
            next(createError(400, 'invalid id'));
            return;
        }
        next(error);
    }
}

module.exports = findUserById;