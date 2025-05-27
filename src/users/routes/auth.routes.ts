import {
  login,
  deleteUser,
  getUserById,
  getAllUsers,
  editUser,
  register,
} from "../../users/controller/auth.controller";

import { isAuth } from "../../utils/isAuth";

import { Router } from "express";
import { createUserDto, loginUserDto, updateUserDto } from "../dtos/user.dto";

const router: Router = Router();

router.post("/login", loginUserDto, login); // tmam
router.get("/:id", getUserById);
router.get("/", isAuth, getAllUsers);
router.patch("/:id", isAuth, updateUserDto, editUser);
router.post("/", createUserDto, register);
router.delete("/:id", isAuth, deleteUser);

export default router;
