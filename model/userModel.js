import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  blogs: [{ type: mongoose.Types.ObjectId, ref: "BLOG" }],
});

const User = mongoose.model("USER", userSchema);

export default User;
