import express, { Request, Response, NextFunction } from "express";
import {
  getAllProductsController,
  getProductByIdController,
  createProductController,
  updateProductController,
  deleteProductController,
} from "../controllers/product.controller";
// import { firstMiddleware } from "../middlaware/first-middleware";

export const productsrouter = express.Router();

productsrouter.get("/", getAllProductsController);
productsrouter.get("/:id", getProductByIdController);
productsrouter.post("/", createProductController);
productsrouter.put("/:id", updateProductController);
productsrouter.delete("/:id", deleteProductController);
