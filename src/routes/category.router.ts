import { Router } from "express";   
import { createCategory, deleteCategoryById, getAllCategory, getAllCategoryById, updateCategory } from "../controllers/category.controller";
import { updateProductController } from "../controllers/product.controller";

export const categoryRouter=Router();

categoryRouter.get("/", getAllCategory);
categoryRouter.get("/:id", getAllCategoryById );
categoryRouter.post("/", createCategory );
categoryRouter.put("/:id", updateCategory);
categoryRouter.delete("/:id", deleteCategoryById);
