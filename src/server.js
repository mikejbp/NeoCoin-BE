// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import connectDb from "./config/db.js";
import signUp from "./routes/signUp.js";
import dotenv from "dotenv";
import singIn from "./routes/singIn.js";
import wallet from "./routes/wallet.js";

// Creating express app
const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();

// connect to the Db
connectDb();
const port = 4000;

app.listen(port, () => {
  console.log(`Server running on port: ${port}...`);
});

app.get("/", (req, res) => {
  res.send("welcome to the todos api...");
});

//routes
app.use("/api/singup", signUp);
app.use("/api/signin", singIn);
app.use("/api/wallet", wallet);

// Starting server
