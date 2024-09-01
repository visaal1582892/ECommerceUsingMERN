const { validationResult } = require("express-validator");
const { errorResponse } = require("../controllers/responseController");
const runValidation = async (req, res, next) => {
    try{
        const errors = await validationResult(req);
        if (!errors.isEmpty()) {
            return errorResponse(res, {status: 422, message:  errors.array()})
        }
        return next();
    }
    catch(err){
        next(err);
    }
}

module.exports = runValidation;