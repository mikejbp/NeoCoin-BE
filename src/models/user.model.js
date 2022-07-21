import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const userSchema = new mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.String,
    required: true,
    maxlength: 100,
  },
  lastname: {
    type: mongoose.Schema.Types.String,
    maxlength: 50,
    required: true,
  },

  email: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  birthdate: {
    type: mongoose.Schema.Types.Date,
    required: false,
  },

  password: {
    type: mongoose.Schema.Types.String,
    minlength: 8,
    maxlength: 1024,
    required: true,
  },
  dni: {
    type: mongoose.Schema.Types.Number,
    required: true,
  },
});

export const User = mongoose.model("User", userSchema);
