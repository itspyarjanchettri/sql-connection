import { Schema } from "mongoose";
import mongoose from "mongoose";

const CategorySchema = new Schema({
  categoryname: { type: String, require: true },
});

const Category = mongoose.model("User", CategorySchema);

export default Category;
