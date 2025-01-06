import { sql } from "../database/database.js";
import { bcrypt } from '../deps.js';

const addUser = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password);
  await sql` 
      INSERT INTO users (email, password) 
      VALUES (${email}, ${hashedPassword})
  `;
};

const authenticateUser = async (email, password) => {
  const rows = await sql` 
        SELECT id, email, password, admin 
        FROM users WHERE email = ${email}
  `;
  const user = rows.length ? rows[0] : null;
   
  if (!user) return null;
  const isValid = await bcrypt.compare(password, user.password);
 
  return isValid ? user : null;
};

const getUserByEmail = async (email) => {
  const rows = await sql` 
        SELECT id, email, password, admin 
        FROM users WHERE email = ${email}
    `;
  return rows.length ? rows[0] : null;
};


export { addUser, authenticateUser, getUserByEmail }