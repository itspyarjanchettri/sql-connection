import { Request, Response } from "express";
import { sqlCategoryModel } from "../sql-models/category.sql-model";

export const getAllCategory = async (req: Request, res: Response) => {
  const category = await sqlCategoryModel.getAll();
  res.json(category);
};

export const getAllCategoryById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const category = await sqlCategoryModel.getcategoryById(id);
  if (!category) res.status(404).json({ error: "Category Not Found" });
  res.status(200).json(category);
};

export const createCategory = async (req: Request, res: Response) => {
  const { category_name } = req.body;
  const newCategory = await sqlCategoryModel.create({ category_name });
  res.status(201).json(newCategory);
};

export const updateCategory = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const {category_name} = req.body;

  const updated = await sqlCategoryModel.updateCategory(id,{ category_name});

  if (!updated) res.status(404).json({ error: "Category not found" });

  res.status(200).json(updated);
};

export const deleteCategoryById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const deleted = await sqlCategoryModel.deleteCategoryById(id);
  if (!deleted)
    res.status(404).json({ error: "Categories Deleted Sucessfully!" });

  res.status(200).json({message: "succesfully deleted !"});
};
