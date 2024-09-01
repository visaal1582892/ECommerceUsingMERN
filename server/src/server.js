const { connect } = require("mongoose");
const app = require("./app");
const {port, mongoDbUrl} = require('./secret');
const connectDb = require("./config/db");

app.listen(port, async ()  => {
    console.log(`server running at http://localhost:${port}/`);
    await connectDb();
})