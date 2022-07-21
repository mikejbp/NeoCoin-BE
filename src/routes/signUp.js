import bcrypt from "bcrypt";
import express from "express";
const router = express.Router();
import Joi from "joi";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

router.post("/", async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    lastname: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(3).max(200).required().email(),
    password: Joi.string().min(8).max(1024).required(),
    dni: Joi.number().required(),
    birthdate: Joi.date(),
  
  });

  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already exists...");

  const { name, email, password, lastname, bithdate, dni } = req.body;

  user = new User({ name, email, password, lastname, bithdate, dni });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const jwtSecretKey = process.env.TODO_APP_JWT_SECRET_KEY;
  const token = jwt.sign(
    { _id: user._id, name: user.name, email: user.email },
    jwtSecretKey
  );

  res.send(token);
});

export default router;
