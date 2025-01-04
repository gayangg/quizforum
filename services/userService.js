import { sql } from "../database/database.js";
import { bcrypt } from '../deps.js';

const addUser = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password);
  await sql` 
      INSERT INTO users (email, password) 
      VALUES (${email}, ${hashedPassword})
  `;
};

const findUserByEmail = async (email) => {
  const rows = await sql` 
        SELECT id, email, password, admin 
        FROM users WHERE email = ${email}
    `;
  return rows.length ? rows[0] : null;
};

export { addUser, findUserByEmail };