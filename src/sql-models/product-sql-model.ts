import products, { getProductById } from "../model/product";
import pool from "./mysql-client";
export const SqlProductModel = {
  async getAll() {
    const [rows] = await pool.query("SELECT * FROM users");
    // console.log("result", rows)
    return rows;
  },

  async getProductById(id: number) {
    const [rows] = await pool.query("SELECT * FROM users where user_id = ?", [
      id,
    ]);
    console.log(rows);
    return Array.isArray(rows) && rows.length ? rows[0] : undefined;
  },

  async update(
    id: number,
    products: Partial<{
      username: string;
      name: string;
      email: string;
      created_id: Date;
    }>
  ) {
    const fields = [];
    const values = [];
    if (products.name !== undefined) {
      fields.push("name = ?");
      values.push(products.name);
    }
    if (products.username !== undefined) {
      fields.push("username = ?");
      values.push(products.username);
    }
    if (products.email !== undefined) {
      fields.push("email = ?");
      values.push(products.email);
    }
    if (products.created_id !== undefined) {
      fields.push("created_id = ?");
      values.push(products.created_id);
    }
    if (!fields.length) return undefined;
    await pool.query(
      `UPDATE users SET ${fields.join(", ")} WHERE user_id = ?`,
      [...values, id]
    );
    return this.getProductById(id);
  },

  async create(products: { username: string; name: string; email: string }) {
    const [result]: any = await pool.query(
      "INSERT into users (username,name,email) values (?,?,?)",
      [products.username, products.name, products.email]
    );
    return {
      id: result.insertId,
      ...products,
    };
  },
  async deleteProductById(id: number) {
    const [result]: any = await pool.query("delete from users where user_id = ?", [
      id,
    ]);
    return result.affectedRows > 0;
    // console.log(result)
  },
};
