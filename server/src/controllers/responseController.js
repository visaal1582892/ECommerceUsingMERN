const errorResponse = (res, {status = 404, message = 'error occurred'}) => {
    return res.status(status).json(
        {success: false,
        message: message,}
    );
}

const successResponse = (res, {status = 200,message = "action performed successfully", payload = {}}) => {
    return res.status(status).json(
        {success: true, message: message, payload}
    );
}

module.exports = {errorResponse, successResponse};