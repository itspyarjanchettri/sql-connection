import pool from "../sql-models/mysql-client";

export const SqlUsersModel = {
  async getAll() {
    const [rows] = await pool.query("SELECT * FROM users");
    // console.log("result", rows)
    return rows;
  },

  async getUsersById(id: number) {
    const [rows] = await pool.query("SELECT * FROM users where users_id = ?", [
      id,
    ]);
    console.log(rows);
    return Array.isArray(rows) && rows.length ? rows[0] : undefined;
  },

  async update(
    id: number,
    users: Partial<{
      username: string;
      name: string;
      email: string;
      created_at: Date;
      update_at: Date;
    }>
  ) {
    const fields = [];
    const values = [];
    if (users.username !== undefined) {
      fields.push("username = ?");
      values.push(users.username);
    }
    if (users.name !== undefined) {
      fields.push("name = ?");
      values.push(users.name);
    }
    if (users.email !== undefined) {
      fields.push("email = ?");
      values.push(users.email);
    }
    if (users.created_at !== undefined) {
      fields.push("created_at = ?");
      values.push(users.created_at);
    }
    if (users.update_at !== undefined) {
      fields.push("update_at = ?");
      values.push(users.update_at);
    }

    if (!fields.length) return undefined;
    await pool.query(
      `UPDATE users SET ${fields.join(", ")} WHERE users_id = ?`,
      [...values, id]
    );
    return this.getUsersById(id);
  },

  async create(users: {
    username: string;
    name: string;
    email: string;
    created_at: Date;
    update_at: Date;
  }) {
    const [result]: any = await pool.query(
      "INSERT into users (username, name, email, created_at, update_at) values (?,?,?,?,?)",
      [
        users.username,
        users.name,
        users.email,
        users.created_at,
        users.update_at,
      ]
    );
    return {
      id: result.insertId,
      ...users,
    };
  },

   async deleteUsersById(id: number) {
    const [result]: any = await pool.query(
      "delete from users where users_id = ?",
      [id]
    );
    return result.affectedRows > 0;
    // console.log(result)
  },

};
