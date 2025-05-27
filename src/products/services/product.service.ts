import Product from "../models/product.model";
import { IProduct } from "../interfaces/product.interface";
import { IUser } from "../../users/interfaces/user.interface";
import { createBaseError } from "../../utils/baseErrorHandler";
import { imageDeletion } from "../../utils/imageUpload";

export const addProduct = async (productData: IProduct): Promise<IProduct> => {
  const { name, price, description, imagePath } = productData;
  const product = new Product({
    name,
    price,
    description,
    imagePath,
  });

  await product.save();

  return product;
};

export const allProducts = async (): Promise<IProduct[]> => {
  const products = await Product.find();
  return products;
};

export const productDeletion = async (
  productId: string,
  currentUser: IUser
): Promise<IProduct> => {
  if (currentUser.role !== "admin") {
    throw createBaseError(
      403,
      "Unauthorized action. Only admins can delete products.",
      []
    );
  }
  const product = await Product.findByIdAndDelete(productId);
  imageDeletion(product!!.imagePath);

  if (!product) {
    throw createBaseError(404, "Product not found.", []);
  }

  return product;
};
