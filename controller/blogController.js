import mongoose from "mongoose";
import BLOG from "../model/blogModel.js";
import USER from "../model/userModel.js";

export const createBlogController = async (req, res) => {
  try {
    const user = await USER.findById(req.body.userId);

    const newBlog = new BLOG(req.body);
    const session = await mongoose.startSession();
    session.startTransaction();
    newBlog.user = req.body.userId;
    await newBlog.save({ session });
    user.blogs.push(newBlog);
    await user.save({ session });
    session.commitTransaction();

    return res.status(201).json({
      success: true,
      msg: "Blog Created Successfully",
      newBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Error While Creating Blogs.",
      error,
    });
  }
};

export const getAllBlogsController = async (req, res) => {
  try {
    const blogs = await BLOG.find().populate("user");

    if (!blogs) {
      return res.status(200).json({
        success: false,
        msg: "No Blogs Found",
      });
    }

    return res.status(200).json({
      success: true,
      BlogCount: blogs.length,
      msg: "All Blogs Lists",
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Error While Getting Blogs.",
      error,
    });
  }
};

export const getSingleBlogController = async (req, res) => {
  try {
    const blog = await BLOG.findOne({ _id: req.params.id });
    console.log(blog);
    return res.status(200).json({
      success: true,
      msg: "Single Blog Fetched",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Error While Getting Single Blog.",
      error,
    });
  }
};

export const updateBlogController = async (req, res) => {
  try {
    const blog = await BLOG.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      msg: "Blog Updated Successfully",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      msg: "Error While Updating Blogs.",
      error,
    });
  }
};

export const deleteBlogController = async (req, res) => {
  try {
    const user = await USER.findOne({ blogs: req.params.id });
    const index = user.blogs.indexOf(req.params.id);
    user.blogs.splice(index, 1);
    await user.save();
    const blog = await BLOG.findOneAndDelete({ _id: req.params.id }).populate(
      "user"
    );

    return res.status(200).json({
      status: true,
      msg: "Blog Deleted Successfully",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error While deleting Blogs.",
      error,
    });
  }
};

export const getUserBlogController = async (req, res) => {
  try {
    const user = await USER.findOne({ _id: req.params.id }).populate("blogs");

    return res.status(200).json({
      success: true,
      msg: "Single user with blogs",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Error in fetching user with blogs",
    });
  }
};
