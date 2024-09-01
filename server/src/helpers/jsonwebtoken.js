const jwt = require('jsonwebtoken')
const createJSONWebToken = (payload, secretKey, expiresIn) => {
    try
    {if(typeof payload !== 'object' || payload === null) {
        throw new Error("invalid payload");
    }
    if(typeof secretKey !== 'string' || secretKey === null) {
        throw new Error("invalid secretKey");
    }
    const token = jwt.sign(payload, secretKey, { expiresIn });
    return token;}
    catch(error) {
        next(error);
    }
}

module.exports = {createJSONWebToken};