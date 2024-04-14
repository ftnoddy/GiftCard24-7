import mongoose from "mongoose";
import colors from "colors";


// Load environment variables from .env file


const connectDB = async () => {
  try {
    const DB = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // serverSelectionTimeoutMS: 5000, // Set a higher value (e.g., 5000 milliseconds)
    });
    console.log(`Connected to MongoDB with ${DB.connection.host}`.green.inverse);
  } catch (error) {
    console.log(`Error: ${error.message}`.red.inverse);
    process.exit(1);
  }
};

export default connectDB;
