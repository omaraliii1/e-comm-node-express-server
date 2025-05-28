import { Router } from "express";
import { upload } from "../../utils/imageUpload";

const router: Router = Router();

import {
  deleteProduct,
  getAllProducts,
  postAddProduct,
} from "../controllers/products.controller";
import { isAuth } from "../../middlewares/isAuth";
import { createProductDto } from "../dtos/products.dto";

router.get("/", getAllProducts);
router.post(
  "/",
  isAuth,
  upload.single("file"),
  createProductDto,
  postAddProduct
);
router.delete("/:id", isAuth, deleteProduct);

export default router;
