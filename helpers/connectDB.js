const { mongoose } = require("mongoose");

const connectDB = async () => {
  try {
    const connectionString = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      `MongoDb connected successfully: ${connectionString.connection.host}`
    );
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
