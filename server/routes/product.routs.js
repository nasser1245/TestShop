import express from 'express';
import { verifyToken, isAdmin, isSeller } from '../middleware/authJWT.js';
import { 
  getAcceptedProducts, createProduct, updateProduct,
  getUserProductsByState, getAllProductsByState, updateProductState, deleteProduct
} from '../controllers/product.controller.js';

const router = express.Router();
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept");
  next();
});

// All Site Users

//* Route: /api/
router.get('/', getAcceptedProducts);


// Product Sellers
// All of them Requires Seller Access Token in the header
//* Seller Route: /api/seller

//*          state: text
//*          email: text
router.get('/seller', [verifyToken, isSeller], getUserProductsByState);

//* Body parameters:
//*          user_email: text
//*          description: text
//*          image_payload: blob
//*          name: text
//*          price: bigInt
//*          user_last_name: text
//*          user_first_name: text
router.post('/seller',[verifyToken, isSeller], createProduct);

//* Body parameters:
//*          product_id: timeuuid
//*          description: text
//*          image_payload: blob
//*          name: text
//*          price: bigInt
router.put('/seller', [verifyToken, isSeller], updateProduct);

//* Body parameters:
//*          product_id: timeuuid
router.delete('/seller', [verifyToken, isSeller], deleteProduct);


// Admin
// Requires Admin Access Token in the header
//* admin Route: /api/admin

//* Body parameters:
//*          state: text
router.get('/admin', [verifyToken, isAdmin], getAllProductsByState);

//* Body parameters:
//*          product_id: timeuuid
//*          state: text - Accepted interpreted as Accepted otherwise the state sets to Rejected
//*          revision_text   
router.put('/admin', [verifyToken, isAdmin], updateProductState);

export default router;
 