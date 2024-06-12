import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import errorHandler from "./middleware/globalErrorHandler.js";
import albumRouter from "./routes/albumRoute.js";

const app = express();

app.use(express.json());
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "frontend/dist")));

try {
  await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
  console.log("Database is connected! 🐱");
} catch (error) {
  console.log(error.message);
  console.log("Database connection failed... :(");
}

app.use("/", albumRouter);

app.get("*", (req,res) => {
  res.sendFile(__dirname + "/frontend/dist/");
})

//* Global Error Handling
app.use(errorHandler);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is listening to port ${port}`);
});
