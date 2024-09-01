const User = require("../models/userModel");
const {users} = require("../data");

const seedUser = async (req, res, next) => {
    try {
        await User.deleteMany({});
        const usersData = await User.insertMany(users);
        return res.status(201).json(usersData);
    } catch (error) {
        next(error);
    }
}

module.exports = {seedUser};