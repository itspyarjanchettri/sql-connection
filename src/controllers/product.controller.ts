import { Request, Response } from "express";

import { SqlProductModel } from "../sql-models/productsql-model";

export const getAllProductsController = async (req: Request, res: Response) => {
  const products = await SqlProductModel.getAll();
  res.json(products);
};

export const getProductByIdController = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const product = await SqlProductModel.getProductById(id);
  console.log("product cont", product);
  if (!product) res.status(404).json({ error: "Product not found" });
  res.status(200).json(product);
};

export const createProductController = async (req: Request, res: Response) => {
  const {
    products_name,
    description,
    price,
    stock_quantity,
    created_at,
    updated_at,
  } = req.body;
  const newProduct = await SqlProductModel.create({
    products_name,
    description,
    price,
    stock_quantity,
    created_at,
    updated_at,
  });
  res.status(201).json(newProduct);
};

export const updateProductController = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const {
    products_name,
    description,
    price,
    stock_quantity,
    created_at,
    updated_at,
  } = req.body;

  const updated = await SqlProductModel.update(id, {
    products_name,
    description,
    price,
    stock_quantity,
    created_at,
    updated_at,
  });
  if (!updated) res.status(404).json({ error: "Product not found" });

  res.status(200).json(updated);
};

export const deleteProductController = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const deleted = await SqlProductModel.deleteProductById(id);
  if (!deleted) res.status(404).json({ error: "Product not found" });

  res.status(200).json(deleted);
};
