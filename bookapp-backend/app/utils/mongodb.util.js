const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");

class MongoDB {
  static connect = async (uri) => {
    if (this.client) return this.client;
    this.client = await MongoClient.connect(uri);
    return this.client;
  };

  static connectDB = async (uri) => {
    try {
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (error) {
      console.log("Error connecting to the database", error);
      process.exit(1);
    }
  };
}

module.exports = MongoDB;
