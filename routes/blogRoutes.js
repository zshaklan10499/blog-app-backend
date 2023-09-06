import express from "express";
import {
  createBlogController,
  deleteBlogController,
  getAllBlogsController,
  getSingleBlogController,
  getUserBlogController,
  updateBlogController,
} from "../controller/blogController.js";

const router = express.Router();

router.post("/create-blog", createBlogController);
router.get("/getall-blog", getAllBlogsController);
router.get("/getsingle-blog/:id", getSingleBlogController);
router.put("/update-blog/:id", updateBlogController);
router.delete("/delete-blog/:id", deleteBlogController);
router.get("/getuser-blog/:id", getUserBlogController);

export default router;
