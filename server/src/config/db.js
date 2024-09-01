const mongoose = require("mongoose");
const {mongoDbUrl} = require("../secret");

const connectDb = async (req, res, next) => {
    try{
        await mongoose.connect(mongoDbUrl);
        console.log('connection to database is successfully established');
        mongoose.connection.on("error", (err,) => {
            console.log(err);
        })
    }
    catch(error){
        next(error);
    }
}

module.exports = connectDb;