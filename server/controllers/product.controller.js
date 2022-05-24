import { client } from './db.connect.js';

export const productStates = {
  waiting: "Waiting for Accept",
  accepted: "Accepted",
  rejected: "Rejected",
}

export const getAcceptedProducts = async (req, res) => {
  const query = `SELECT product_id, name, state, user_first_name, 
    user_last_name, description, price, comment, image_payload FROM shopping.products WHERE state = ?`;
  await client.execute(query, [productStates.accepted], { prepare: true })
    .then(result => {
      console.log(`Selecting query finds ${result.rowLength} results.`)
      delete result['info'];
      result.rows.map(row => row.price = (row.price / 100).toFixed(2));
      res.status(200).json(result);
    })
    .catch(error =>
      res.status(404).json({ message: 'Error while retrieving product data.', error })
    );
}

export const getUserProductsByState = async (req, res) => {
  const query = `SELECT product_id, name, state, user_first_name, 
  user_last_name, description, price, comment, image_payload
  FROM shopping.products WHERE state = ? and user_email = ?`;
  await client.execute(query, [res.locals.state, res.locals.email], { prepare: true })
    .then(result => {
      console.log(`Selecting query finds ${result.rowLength} results.`)
      delete result['info'];
      result.rows.map(row => row.price = (row.price / 100).toFixed(2));
      res.status(200).json(result);
    })
    .catch(error =>
      res.status(404).json({ message: 'Error while retrieving product data.', error })
    );
}

export const getAllProductsByState = async (req, res) => {
  const query = `SELECT product_id, name, state, user_first_name, 
  user_last_name, description, price, comment, image_payload
  FROM shopping.products WHERE state = ?`;
  await client.execute(query, [res.locals.state], { prepare: true })
    .then(result => {
      console.log(`Selecting query finds ${result.rowLength} results.`)
      delete result['info'];
      result.rows.map(row => row.price = (row.price / 100).toFixed(2));
      res.status(200).json(result);
    })
    .catch(error =>
      res.status(404).json({ message: 'Error while retrieving product data.', error })
    );
}

export const createProduct = async (req, res) => {
  const values = req.body;
  const query = `insert into shopping.products 
    (product_id, state, user_email, description, image_payload, name, price, user_last_name, user_first_name)
    values( now(), ?, ?, ?, ?, ?, ?, ?, ?)`;
  await client.execute(query, [productStates.waiting, values.user_email, values.description, values.image_payload, 
    values.name, Number(values.price) * 100, values.user_last_name, values.user_first_name],
    {hints: ["text", "text", "text", "text", "text", "bigint", "text", "text"]})
    .then(result => {
      res.status(201).json('Product successfully added!')
    }).catch(error => {
      res.status(409).json({ message: error.message })
    });
}

export const updateProduct = async (req, res) => {
  const values = req.body;
  const query = `update shopping.products set state = ?, name = ?, description = ?,  
    price = ?, image_payload = ? where product_id = ?`;
  await client.execute(query, [productStates.waiting, values.name, values.description, Number(values.price) * 100,
  values.image_payload, values.product_id],
  {hints: ["text", "text", "text", "bigint", "text", "timeuuid"]})
    .then(result => {
      res.status(200).json({ message: 'Successfully updated the product.' });
    }).catch(error => {
      res.status(400).json({ message: 'Bad Request.', error });
    })
}
export const updateProductState = async (req, res) => {
  const values = req.body;
  const newState = values.state === 'Accepted' ? productStates.accepted : productStates.rejected;
  const query = 'update shopping.products set state = ?, comment = ? where product_id = ?';
  await client.execute(query, [newState, values.comment, values.product_id], { prepare: true })
    .then(result => {
        res.status(200).json({ message: 'Successfully updated the product state.' });
    }).catch(error => {
      res.status(400).json({ message: 'Bad Request.', error });
    })
}


export const deleteProduct = async (req, res) => {
  const values = req.body;
  const query = `delete from shopping.products where product_id = ?`;
  await client.execute(query, [values.product_id], { prepare: true })
  .then(result => {
      res.status(200).json({ message: 'Successfully deleted the product.' });
    }).catch(error => {
      res.status(400).json({ message: 'Bad Request.', error });
    })
}
