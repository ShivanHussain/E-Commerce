import express from 'express';
import { addProduct, deleteProduct, editProduct, getALLProduct, getProductByFilter, getProductById } from '../controller/productController.js';
import { isAdmin, isAuthenticatedUser } from '../middleware/auth.js';

const router = express.Router();

router.get("/",getProductByFilter);
router.post("/add",isAuthenticatedUser,isAdmin, addProduct);
router.get("/get/:id",getProductById);
router.delete("/delete/:id",isAuthenticatedUser,isAdmin,deleteProduct);
router.get("/getAll",getALLProduct);
router.put("/update/:id", isAuthenticatedUser, isAdmin, editProduct);






export default router;