import express from "express";
import {
  userLogin,
  userRegister,
  getAllUsers,
} from "../controller/userController.js";

const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/getuser", getAllUsers);

export default router;
