import mongoose from "mongoose";

const walletSchema = mongoose.Schema({
  directionName: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  arg: {
    type: Number,
    required: true,
  },
  btc: {
    type: Number,
    required: true,
  },
  eth: {
    type: Number,
    required: true,
  },
  usdt: {
    type: Number,
    required: true,
  },
  bnb: {
    type: Number,
    required: true,
  },
  usdc: {
    type: Number,
    required: true,
  },
  uid: {
    type: String,
  },
});

const Wallet = mongoose.model("Wallet", walletSchema);
export default Wallet;
