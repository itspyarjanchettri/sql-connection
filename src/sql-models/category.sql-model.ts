import { create } from "domain";
import pool from "./mysql-client";
export const sqlCategoryModel = {
  async getAll() {
    const [rows] = await pool.query("SELECT * FROM categories");
    return rows;
  },

  async getcategoryById(id: number) {
    const [rows] = await pool.query(
      "select * from categories where category_id = ?",
      [id]
    );
    return Array.isArray(rows) && rows.length ? rows[0] : undefined;
  },

  async create(categories: { category_name: string }) {
    const [rows]: any = await pool.query(
      "insert into categories (category_name) values (?)",
      [categories.category_name]
    );
    return {
      id: rows.insertId,
      ...categories,
    };
  },

  async updateCategory(id: number, categories: Partial<{ name: string }>) {
    const fields = [];
    const values = [];
    if (categories.name !== undefined){
      fields.push("name=?");
      values.push(categories.name);
    }
    if (!fields.length) return undefined;
    await pool.query(`UPDATE categories SET ${fields.join(", ")} WHERE category_id = ?`,
      [...values, id]);
      return this.getcategoryById(id);
  },

  async deleteCategoryById(id:number){
    const [rows]:any = await pool.query("delete from categories where category_id = ?",[
      id,
    ]);
    return rows.affectedRows > 0;
  }
};
