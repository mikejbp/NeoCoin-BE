import auth from "../middleware/auth.js";
import Wallet from "../models/wallet.model.js";
import Joi from "joi";
import express from "express";
const router = express.Router();

//peticion get solo trae las jornada del empleado que hizo la peticionn
router.get("/", auth, async (req, res, next) => {
  try {
    const wallets = await Wallet.find().sort({ date: -1 });
    const filteredWallet = wallets.filter(
      (wallet) => wallet.uid === req.user._id
    );
    res.send(filteredWallet);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

//esta peticion es especial para el usuario admin , ya que trae todo
router.get("/admin", auth, async (req, res, next) => {
  try {
    const wallets = await Wallet.find();

    res.send(wallets);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

//peticion post puede añadir una nueva jornada
router.post("/", auth, async (req, res) => {
  const schema = Joi.object({
    directionName: Joi.string().min(3).max(200).required(),
    user: Joi.string().min(3).required(),
    arg: Joi.number().required(),
    btc: Joi.number().required(),
    eth: Joi.number().required(),
    usdt: Joi.number().required(),
    bnb: Joi.number().required(),
    usdc: Joi.number().required(),
    uid: Joi.string(),
  });

  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const { directionName, user, arg, btc, eth, usdt, bnb, usdc, uid } = req.body;

  let wallet = new Wallet({
    directionName,
    user,
    arg,
    btc,
    eth,
    usdt,
    bnb,
    usdc,
    uid,
  });

  wallet = await wallet.save();
  res.send(wallet);
});

router.put("/:id", auth, async (req, res) => {
  const schema = Joi.object({
    directionName: Joi.string().min(3).max(200).required(),
    user: Joi.string().min(3).required(),
    arg: Joi.number().required(),
    btc: Joi.number().required(),
    eth: Joi.number().required(),
    usdt: Joi.number().required(),
    bnb: Joi.number().required(),
    usdc: Joi.number().required(),
    uid: Joi.string(),
  });

  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const wallet = await Wallet.findById(req.params.id);

  if (!wallet) return res.status(404).send("Todo not found...");

  if (wallet.uid !== req.user._id)
    return res.status(401).send("Todo update failed. Not authorized...");

  const { directionName, user, arg, btc, eth, usdt, bnb, usdc, uid } = req.body;

  const updatedWallet = await Wallet.findByIdAndUpdate(
    req.params.id,
    { directionName, user, arg, btc, eth, usdt, bnb, usdc, uid },
    { new: true }
  );

  res.send(updatedWallet);
});

router.patch("/:id", auth, async (req, res) => {
  const wallet = await Wallet.findById(req.params.id);

  if (!wallet) return res.status(404).send("Todo not found...");

  const updatedWallet = await Wallet.findByIdAndUpdate(
    req.params.id,
    {
      isComplete: !wallet.isComplete,
    },
    {
      new: true,
    }
  );

  res.send(updatedWallet);
});

//elimina por id , si no es el usuario no lo puede eliminar
router.delete("/:id", auth, async (req, res) => {
  const wallet = await Wallet.findById(req.params.id);

  if (!wallet) return res.status(404).send("Todo not found...");

  if (wallet.uid !== req.user._id)
    return res.status(401).send("Todo deletion failed. Not authorized...");

  const deletedWallet = await Wallet.findByIdAndDelete(req.params.id);

  res.send(deletedWallet);
});

export default router;
