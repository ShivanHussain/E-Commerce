import mongoose from "mongoose";
import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/error.js";
import  User  from "../models/user.js";



// Add a product to the user's cart
export const addToCart = catchAsyncError(async (req, res, next) => {

    const productID = req.headers.productid;
    const id = req.headers.id;


    const userData = await User.findById(id);

    if (!userData) {
        return next(new ErrorHandler("User not found", 404));
    }

    const isProductCart = userData.cart.includes(productID);

    if (isProductCart) {
        return next(new ErrorHandler("Product is already in cart", 400));
    }

    await User.findByIdAndUpdate(id, { $push: { cart: productID } });

    res.status(200).json({
        success: true,
        message: "Product added to cart successfully!",
    });
});



// Get all items in the user's cart
export const getCartItems = catchAsyncError(async (req, res, next) => {
    const { id } = req.headers;

    

    const user = await User.findById(id).populate("cart");

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }


    res.status(200).json({
        success: true,
        cart: user.cart,
    });
});



// Remove a product from the user's cart
export const removeFromCart = catchAsyncError(async (req, res, next) => {
    const { productID } = req.params;
    const id = req.headers.id;
    
    const userData = await User.findById(id);
    if (!userData) {
        return next(new ErrorHandler("User not found", 404));
    }

    // Compare strings instead of ObjectIds
    const isProductCart = userData.cart.map(item => item.toString()).includes(productID);
    if (!isProductCart) {
        return next(new ErrorHandler("Product is not in cart", 400));
    }

    // Perform $pull operation
    await User.findByIdAndUpdate(id, { $pull: { cart: productID } });

    res.status(200).json({
        success: true,
        message: "Product removed from cart successfully!",
    });
});



