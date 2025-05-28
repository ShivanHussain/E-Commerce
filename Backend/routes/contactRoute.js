import express from "express";
import {
  submitContactForm,
  getAllMessages,
} from "../controller/contactController.js";
import { isAdmin, isAuthenticatedUser } from "../middleware/auth.js";

const router = express.Router();

router.post("/send",submitContactForm);
router.get("/messages",isAuthenticatedUser,isAdmin, getAllMessages); // You can add auth middleware here

export default router;
