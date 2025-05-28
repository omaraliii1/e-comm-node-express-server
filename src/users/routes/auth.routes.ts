import {
  login,
  deleteUser,
  getUserById,
  getAllUsers,
  editUser,
  register,
} from "../../users/controller/auth.controller";

import { isAuth } from "../../middlewares/isAuth";

import { Router } from "express";
import { createUserDto, loginUserDto, updateUserDto } from "../dtos/user.dto";

const router: Router = Router();

router.get("/:id", getUserById);
router.get("/", isAuth, getAllUsers);
router.delete("/:id", isAuth, deleteUser);
router.post("/", createUserDto, register);
router.post("/login", loginUserDto, login);
router.patch("/:id", isAuth, updateUserDto, editUser);

export default router;
