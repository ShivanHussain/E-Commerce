import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/error.js";
import  User from "../models/user.js";
import jwt from 'jsonwebtoken';


//for sign up
export const registered = catchAsyncError(async (req, res, next) => {

    const { name, email, password , mobileNumber}=req.body;

    //Check for missing fields
    if (!name || !email || !password) {
        return next(new ErrorHandler("All fields are mandatory", 400));
    }




    //Check if user already exists with this email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return next(new ErrorHandler("User already registered with this email", 400));
    }

    //Check if user already exists with this phone number
    const existingPhone = await User.findOne({ phone: mobileNumber });
    if (existingPhone) {
        return next(new ErrorHandler("User already registered with this Phone NUmber", 400));
    }


    //  Validate password
    if (password.length < 8) {
        return next(new ErrorHandler("Password must be at least 8 characters", 400));
    }


    //  Create new user
    const newUser = await User.create({ name, email, password, phone: mobileNumber });
    if (!newUser) {
        return next(new ErrorHandler("Failed to create user", 500));
    }





    //create JWT payload
    const payload = { user: { id: newUser._id, role: newUser.role } }




    //Sign and return the token along with user data
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" }, (err, token) => {
        if (err) {
            return next(new ErrorHandler("Internal Server error", 500));
        }

        //send the user and token in response

        res.status(200).json({
            success: true,
            message:"Registered Successfully",
            data: newUser,
            token,
        });

    });


});




//for login
export const login = catchAsyncError(async (req, res, next) => {

    let { email, password } = req.body || {};

    // Trim inputs
    email = email?.trim();
    password = password?.trim();

    if (!email || !password) {
        return next(new ErrorHandler("Email and Password are required", 400));
    }

    // Find user by email and include password
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid credentials", 400));
    }

    // Compare password (assuming user model has matchPassword method)
    const isPasswordMatch = await user.matchPassword(password);
    if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid credentials", 400));
    }

    // Create JWT payload
    const payload = { user: { id: user._id, role: user.role } };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" }, (err, token) => {
        if (err) {
            return next(new ErrorHandler("Internal Server Error", 500));
        }

        res.status(200).json({
            success: true,
            message:"Login Successfully",
            data:user,
            token,
        });
    });
});






// logout the user with cookie
export const logout = catchAsyncError(async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    });

});



//Get ALL user
export const getAllUsers = catchAsyncError(async (req, res, next) => {
    const users = await User.find().select("-password");
    if (!users) {
        return next(new ErrorHandler("No users found", 404));
    }
    res.status(200).json({
        success: true,
        users
    });
});


//-------------------->Admin
export const profile = catchAsyncError(async (req, res, next)=>{
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }
    res.status(200).json({
        success: true,
        user
    });

});



// Delete user by ID
export const deleteUser = catchAsyncError(async (req, res, next) => {
    const userId = req.params.id;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    // Delete user
    await User.findByIdAndDelete(userId);

    res.status(200).json({
        success: true,
        message: "User deleted successfully"
    });
});



// Get user by ID
export const getUserById = catchAsyncError(async (req, res, next) => {
    const userId = req.params.id;

    // Check if user exists
    const user = await User.findById(userId).select("-password");
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    res.status(200).json({
        success: true,
        user
    });
});