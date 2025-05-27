import mongoose, { Schema } from "mongoose";
import { IProduct } from "../interfaces/product.interface";

const productSchema: Schema<IProduct> = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imagePath: {
    type: String,
    default: "images/default.png",
  },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
