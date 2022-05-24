import jwt from 'jsonwebtoken';
import { client } from '../controllers/db.connect.js';
import dotenv from "dotenv";
dotenv.config();

export const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }
  jwt.verify(token, process.env.JWTSECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.email = decoded.email;
    res.locals.email = decoded.email;
    next();
  });
};

export const isAdmin = async (req, res, next) => {
  const query = `select is_admin from shopping.users where email=? and is_admin=true`;
  await client.execute(query, [req.email], { prepare: true })
    .then(result => {
      if (result.rowLength === 1) {
        res.locals.state = req.query.state;
        next();
        return;
      } else {
        res.status(403).json({ message: 'Needs admin priviledges.' });
      }
    }).catch(error =>
      res.status(409).json({ message: 'Error while request admin grant.', error })
    );
}

export const isSeller = async (req, res, next) => {
  const query = `select is_admin from shopping.users where email=? and is_admin=false`;
  await client.execute(query, [req.email], { prepare: true })
    .then(result => {
      if (result.rowLength === 1) {
        res.locals.email = req.query.email;
        res.locals.state = req.query.state;
        next();
        return;
      } else {
        res.status(403).json({ message: 'Needs seller priviledges.' });
      }
    }).catch(error =>
      res.status(409).json({ message: 'Error while request seller grant.', error })
    );
};
