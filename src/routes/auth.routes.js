const {
  register,
  login,
  deleteUser,
  logout,
  getUserById,
  getAllUsers,
  editUser,
} = require("../controllers/auth.controller");
const { body } = require("express-validator");
const { isAuth } = require("../utils/isAuth");

const validateUser = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3, max: 20 })
    .withMessage("Username must be 3–20 characters"),
  body("email").trim().isEmail().withMessage("Enter a valid email"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

const router = require("express").Router();

router.get("/all", isAuth, getAllUsers);

router.delete("/:id", isAuth, deleteUser);
router.get("/:id", getUserById);
router.put("/edit", isAuth, editUser);

router.route("/").post(validateUser, register).put(login);

module.exports = router;
