import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./database/dbConfig.js";
import userRoutes from "./routes/userRoutes.js";
import urlRoutes from "./routes/urlRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/user", userRoutes);
app.use("/api/url", urlRoutes);

app.get("/", (req, res) => {
  res.send(`<h1 style=text-align:center>Welcome to URL Shortener Backend<h1>`);
});

app.listen(port, () => {
  console.log(`Connected to the port`, port);
});
