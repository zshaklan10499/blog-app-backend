import mongoose from "mongoose";
import dotenv from "dotenv";

// dotenv config
dotenv.config();

const Connection = () => {
  try {
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Database Connected to port ${process.env.PORT}`);
  } catch (error) {
    console.log(`Database Connection error ${error}`);
  }
};

export default Connection;
