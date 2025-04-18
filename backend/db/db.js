require("dotenv").config({ path: "config.env" });
const mongoose = require("mongoose");

console.log(process.env.URL);
const db = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.URL);
    console.log("DB connected");
  } catch (error) {
    console.log("DB connection error");
  }
};

module.exports = { db };
