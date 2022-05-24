
import { client } from '../controllers/db.connect.js';
export default async (req, res, next) => {
  const query = `SELECT email FROM shopping.users WHERE email = ?`;
  await client.execute(query, [req.body.email], { prepare: true})
    .then(result => {
      if (result.rowLength > 0) {
        res.status(400).json({ message: 'Email already registered.' });
        return;
      }
      next();
    }).catch(error => {
      res.status(409).json({ message: 'Error during execute query.', error }
      )
    }
    );
}
