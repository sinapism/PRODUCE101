// authRoutes.js

import express from 'express';
import mysql from 'mysql';
import bcrypt from 'bcrypt';

const authRouter = express.Router();
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'test',
});

authRouter.post('/login', async (req, res) => {
  // ... (same login route as before)
});

authRouter.post('/signup', async (req, res) => {
  // ... (same signup route as before)
});

export default authRouter;
