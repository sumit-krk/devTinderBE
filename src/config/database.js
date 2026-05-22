const mongoose = require("mongoose");

const mongoURI =
  process.env.MONGODB_URI ||
  "mongodb://sumit:Sumitkrk07@cluster0-shard-00-00.irhgi.mongodb.net:27017," +
    "cluster0-shard-00-01.irhgi.mongodb.net:27017," +
    "cluster0-shard-00-02.irhgi.mongodb.net:27017/dev-TinderBE" +
    "?tls=true&authSource=admin&replicaSet=atlas-53t2cg-shard-0" +
    "&retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

module.exports = { connectDB };
