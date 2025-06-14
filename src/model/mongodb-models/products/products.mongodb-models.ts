import { Schema } from "mongoose";
import mongoose from "mongoose";
import products from "../../product";

const productSchema = new Schema({
  productname: { type: String, require: true },
  description: { type: String, require: true },
  stock: { type: Number, require: true },
});

const product = mongoose.model("User", productSchema);

export default product;
