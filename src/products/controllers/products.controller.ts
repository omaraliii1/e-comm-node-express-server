import { Request, Response } from "express";
import { allProducts } from "../services/product.service";
import { IProduct } from "../interfaces/product.interface";
import { findById } from "../../users/services/user.service";
import { createBaseError } from "../../utils/baseErrorHandler";
import { BaseResponse } from "../../interfaces/responses.interface";
import { BaseResponseHandler } from "../../utils/baseResponseHandler";
import { addProduct, productDeletion } from "../services/product.service";

export const getAllProducts = async (
  req: Request,
  res: Response<BaseResponse<IProduct[]>>
) => {
  const products = await allProducts();
  res.json(
    BaseResponseHandler.create(200, "Products fetched successfully", products)
  );
};

export const postAddProduct = async (
  req: Request,
  res: Response<BaseResponse<IProduct>>
): Promise<void> => {
  if (!req.file) {
    throw createBaseError(400, "Image file is required", []);
  }
  const productData = {
    ...req.body,
    price: parseFloat(req.body.price),
    imagePath: req.file.path,
  };
  const product = await addProduct(productData);

  res
    .status(200)
    .json(
      BaseResponseHandler.create(200, "Product added successfully", product)
    );
};

export const deleteProduct = async (
  req: Request,
  res: Response<BaseResponse<IProduct>>
): Promise<void> => {
  const productId = req.params.id;
  const currentUser = await findById(req.user.id);

  const product = await productDeletion(productId, currentUser);

  res
    .status(200)
    .json(
      BaseResponseHandler.create(200, "Product deleted successfully", product)
    );
};
