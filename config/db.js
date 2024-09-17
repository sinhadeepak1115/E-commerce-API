const mongoose = require("mongoose");

const db = "mongodb://localhost:27017/e";

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log("MongoDB is connected");
  } catch (err) {
    console.err(err);
    process.exit(1);
  }
};

module.exports = connectDB;
