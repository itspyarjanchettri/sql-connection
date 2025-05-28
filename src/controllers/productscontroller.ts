import { Request, Response } from "express";
// import {
//   getAllProducts,
//   getProductById,
//   createProductDetails,
//   updateProductDetails,
//   deleteProductById,
// } from "../model/product";
import { SqlProductModel } from "../sql-models/product-sql-model";

export const getAllProductsController = async (req: Request, res: Response) => {
  const products = await SqlProductModel.getAll();
  res.json(products);
};

export const getProductByIdController = async(req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const product = await SqlProductModel.getProductById(id);
  console.log("product cont", product)
  if (!product) res.status(404).json({ error: "Product not found" });
  res.status(200).json(product);
};

export const createProductController = async(req: Request, res: Response) => {
  const {  username, name, email } = req.body;
  const newProduct = await SqlProductModel.create({ username, name, email});
  res.status(201).json(newProduct);
};

export const updateProductController = async(req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { username, name, email, created_id} = req.body;

  const updated = await SqlProductModel.update(id, { username, name, email, created_id});
  if (!updated) res.status(404).json({ error: "Product not found" });

  res.status(200).json(updated);
};

export const deleteProductController =async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const deleted =await SqlProductModel.deleteProductById(id);
  if (!deleted) res.status(404).json({ error: "Product not found" });

  res.status(200).json(deleted);
};
