import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    const MONGODB_URI= "mongodb+srv://sudeshnapatil972:FNLNUGfuClMBLn4k@cluster0.qx2e3mb.mongodb.net/Register";
        await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
};
