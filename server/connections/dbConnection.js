const config = require("config");
const mongoose = require("mongoose");
// const Model = require("../models");

const MongoDbConnection = async () => {
  var url = config.get("mongo.url");
  try {
    await mongoose.connect(url);
    console.log("MongoDB Server Connected  Successfully ");
  } catch (error) {
    throw error;
  }
};

module.exports = {
  MongoDbConnection: MongoDbConnection,
};
