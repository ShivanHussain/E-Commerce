import express from 'express';
import { removeFromCart, getCartItems, addToCart } from '../controller/cartController.js';
import { isAuthenticatedUser } from '../middleware/auth.js';

const router = express.Router();



router.get('/',isAuthenticatedUser, getCartItems);
router.post('/add',isAuthenticatedUser,addToCart);
router.delete('/remove/:productID', isAuthenticatedUser,removeFromCart);


export default router;