import express from "express";
import dotenv from "dotenv";
import connectionDB from "./DB connection/connectDB.js";
import bodyParser from "body-parser";
import userRouter from "./routes/user.routes.js";
dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("Hello ");
});
app.use(bodyParser.json());

app.use("/api/user", userRouter);

app.listen(PORT, (req, res) => {
  connectionDB();

  console.log(`app is listening on the ${PORT}`);
});
console.log("hello");
