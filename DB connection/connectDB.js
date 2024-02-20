import mongoose from "mongoose";

const connectionDB = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URL);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log(error, "Database Failed ");
  }
};
export default connectionDB;
