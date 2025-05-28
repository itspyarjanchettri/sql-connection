import { Router } from "express";   
import { createCategory, deleteCategoryById, getAllCategory, getAllCategoryById } from "../controllers/category.controller";

export const categoryRouter=Router();

categoryRouter.get("/", getAllCategory);
categoryRouter.get("/:id", getAllCategoryById );
categoryRouter.post("/", createCategory );
categoryRouter.delete("/:id", deleteCategoryById);
