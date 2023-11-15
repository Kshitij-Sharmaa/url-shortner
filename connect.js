const mongoose = require("mongoose");

async function connection(url) {
  try {
    await mongoose.connect(url);
    console.log("connected successfully");
  } catch (error) {
    console.log(error);
  }
}

module.exports = { connection };
