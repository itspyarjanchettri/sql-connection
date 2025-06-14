// import products, { getProductById } from "../model/product";
import pool from "./mysql-client";
export const SqlProductModel = {
  async getAll() {
    const [rows] = await pool.query("SELECT * FROM products");
    // console.log("result", rows)
    return rows;
  },

  async getProductById(id: number) {
    const [rows] = await pool.query(
      "SELECT * FROM products where products_id = ?",
      [id]
    );
    console.log(rows);
    return Array.isArray(rows) && rows.length ? rows[0] : undefined;
  },

  async update(
    id: number,
    products: Partial<{
      products_name: string;
      description: string;
      price: number;
      stock_quantity: number;
      created_at: Date;
      updated_at: Date;
    }>
  ) {
    const fields = [];
    const values = [];
    if (products.products_name !== undefined) {
      fields.push("products_name = ?");
      values.push(products.products_name);
    }
    if (products.description !== undefined) {
      fields.push("description = ?");
      values.push(products.description);
    }
    if (products.price !== undefined) {
      fields.push("price = ?");
      values.push(products.price);
    }
    if (products.stock_quantity !== undefined) {
      fields.push("stock_quantity = ?");
      values.push(products.stock_quantity);
    }
    if (products.created_at !== undefined) {
      fields.push("created_at = ?");
      values.push(products.created_at);
    }
    if (products.updated_at !== undefined) {
      fields.push("updated_at = ?");
      values.push(products.updated_at);
    }
    if (!fields.length) return undefined;
    await pool.query(
      `UPDATE products SET ${fields.join(", ")} WHERE products_id = ?`,
      [...values, id]
    );
    return this.getProductById(id);
  },

  async create(products: {
    products_name: string;
    description: string;
    price: number;
    stock_quantity: number;
    created_at: Date;
    updated_at: Date;
  }) {
    const [result]: any = await pool.query(
      "INSERT into products (products_name, description, price, stock_quantity, created_at, updated_at) values (?,?,?,?,?,?)",
      [
        products.products_name,
        products.description,
        products.price,
        products.stock_quantity,
        products.created_at,
        products.updated_at,
      ]
    );
    return {
      id: result.insertId,
      ...products,
    };
  },
  async deleteProductById(id: number) {
    const [result]: any = await pool.query(
      "delete from products where products_id = ?",
      [id]
    );
    return result.affectedRows > 0;
    // console.log(result)
  },
};
