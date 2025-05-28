import express from 'express';
import { changeOrderStatus, getAllOrders, getOrderById, getOrderHistory, placeOrder } from '../controller/orderController.js';
import { isAdmin, isAuthenticatedUser } from '../middleware/auth.js';


const router = express.Router();


router.post('/place',isAuthenticatedUser,placeOrder );
router.get("/get",getOrderHistory);
router.get("/getby/:id",isAuthenticatedUser,getOrderById);



//admin 
router.get("/get/all",isAuthenticatedUser,isAdmin,getAllOrders); 
router.put("/change-status/:id",isAuthenticatedUser,isAdmin,changeOrderStatus);




export default router;