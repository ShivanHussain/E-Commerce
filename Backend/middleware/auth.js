import  User from "../models/user.js";
import { catchAsyncError } from "./catchAsyncError.js";
import jwt from 'jsonwebtoken';
import ErrorHandler from "./error.js";



//for authentication
export const isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  let token;

  // Try to get token from cookies
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  //try to get token from Authorization header
  else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // If no token, throw error
  if (!token) {
    return next(new ErrorHandler("User Not Authenticated!", 400));
  }

  try {
    //Verify token
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);


    req.user = await User.findById(decodedData.user.id).select("-password");   //exclude password
    next();
  } catch (error) {
    return next(new ErrorHandler("Invalid or expired token!", 401));
  }
});


//check admin or user
export const isAdmin = catchAsyncError(async (req, res, next)=>{

  if(req.user && req.user.role === "Admin"){
    next();
  }
  else{
    return next(new ErrorHandler("Not Authorized as the Admin",404));
  }
})
