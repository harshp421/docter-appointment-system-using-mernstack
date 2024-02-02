const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require('dotenv');
dotenv.config();
mongoose.set('strictQuery', true);
const connectDB = async () => {
  try {
    console.log(process.env.MONGO_CONNECT,"connect string")
    await mongoose.connect(process.env.MONGO_CONNECT);
    console.log(`Mongodb connected ${mongoose.connection.host}`.bgGreen.white);
  } catch (error) {
    console.log(`Mongodb Server Issue ${error}`.bgRed.white);
  }
};

module.exports = connectDB;
