import mongoose from "mongoose";

const ConnectDB = async () => {
  console.log(ConnectDB)
  mongoose.set("strictQuery", true);

  // already connected
  if (mongoose.connection.readyState === 1) {
    console.log("MongoDB already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default ConnectDB;
