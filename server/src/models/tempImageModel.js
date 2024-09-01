const {Schema, model} = require("mongoose");
const tempImageSchema = Schema({
    image: {
        type: String,
    }
});

const tempImageModel = model('tempImageModel', tempImageSchema);

module.exports = tempImageModel;