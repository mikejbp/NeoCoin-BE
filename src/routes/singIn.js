import bcrypt from "bcrypt";
import express from "express";
const router = express.Router();
import Joi from "joi";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
//SingIn , se requiere si o si un email y password

router.post("/", async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().min(3).max(200).required().email(),
    password: Joi.string().min(8).max(200).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password...");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send("Invalid email or password...");

  const jwtSecretKey = process.env.TODO_APP_JWT_SECRET_KEY;
  const token = jwt.sign(
    { _id: user._id, name: user.name, email: user.email, tipo: user.tipo },
    jwtSecretKey
  );

  res.send(token);
});

export default router;
