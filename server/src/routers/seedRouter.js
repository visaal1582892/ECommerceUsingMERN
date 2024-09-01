const express = require("express");
const { seedUser } = require("../controllers/seedController");
seedRouter = express.Router();

seedRouter.get("/", seedUser);

module.exports = {seedRouter};
