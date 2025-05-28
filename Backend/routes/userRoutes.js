import express from 'express';
import { deleteUser, getAllUsers, getUserById, login, logout, profile, registered } from '../controller/userController.js';
import { isAdmin, isAuthenticatedUser } from '../middleware/auth.js';


const router = express.Router();


//User
router.post("/register",registered);
router.post("/login",login);
router.get("/logout",isAuthenticatedUser,logout)
router.get("/profile",isAuthenticatedUser,profile);


//Admin
router.get("/admin/getuser",isAuthenticatedUser,isAdmin,getAllUsers);
router.delete("/admin/deleteuser/:id",isAuthenticatedUser,isAdmin,deleteUser);
router.get("/admin/user/:id",isAuthenticatedUser,isAdmin,getUserById);








export default  router;