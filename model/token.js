import mongoose from "mongoose";

const tokenSchema = mongoose.Schema({
  token: { type: String, required: true, unique: true },
});

const Token = mongoose.model("TOKEN", tokenSchema);

export default Token;
