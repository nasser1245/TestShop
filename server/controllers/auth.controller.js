import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { client } from '../controllers/db.connect.js';
import dotenv from 'dotenv';
dotenv.config();

export const signup = async (req, res, next) => {
  const values = req.body;
  const query = `insert into shopping.users (email, first_name, last_name, password, is_Admin ) 
                values ( ?, ?, ?, ?, false )`;
  await client.execute(query,
    [values.email, values.first_name, values.last_name, bcrypt.hashSync(values.password, 8)], { prepare: true })
    .then(result => {
      next();
    }).catch(error =>
      res.status(409).json({ message: 'Error while registering user.', error })
    );
};

export const signin = async (req, res) => {
  const query = `select password, is_admin, email, first_name, last_name from shopping.users where email = ? `;
  await client.execute(query, [req.body.email], { prepare: true })
    .then(result => {
      if (result.rowLength !== 1)
        return res.status(401).json({ message: 'Email or password is not valid.' });
      const isPasswordValid = bcrypt.compareSync(req.body.password, result.rows[0].password);
      if (!isPasswordValid)
        return res.status(401).json({ message: 'Email or password is not valid.' });
        const token = jwt.sign({ email: req.body.email }, process.env.JWTSECRET, {
        expiresIn: 86400 // 24 hours
      });
      res.status(200).json({
        email: result.rows[0].email,
        first_name: result.rows[0].first_name,
        last_name: result.rows[0].last_name,
        accessToken: token,
        priviledge: result.rows[0].is_admin,
      });
    })
    .catch(error => {
      res.status(409).json({ message: 'Error while signing in.' });
      return;
    }
    );
};