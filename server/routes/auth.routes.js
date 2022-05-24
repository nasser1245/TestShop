import express from 'express';
import { signin, signup } from '../controllers/auth.controller.js'
import verifySignUp from '../middleware/verifySignUp.js';

const router = express.Router();
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept");
  next();
});

//* Route: /api/auth/signin
//* Body parameters:
//*          email: text
//*          password: text
router.post('/signin', signin);

//* Route: /api/auth/signup
//* Body parameters:
//*          email: text
//*          first_name: text
//*          last_name: text
//*          password: text
//* Redirects to sigin after successful signup.
router.post('/signup', [ verifySignUp , signup], signin);

export default router;