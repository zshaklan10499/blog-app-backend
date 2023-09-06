import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "USER",
    require: [true, "User id is required"],
  },
});

const Blog = mongoose.model("BLOG", blogSchema);

export default Blog;
