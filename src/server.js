const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./db");



app.listen(3000, async() => {
    await connectDB();
    console.log("Server is running on port 3000");
});