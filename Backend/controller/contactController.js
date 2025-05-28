import Contact from "../models/contact.js";
import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/error.js";

//
export const submitContactForm = catchAsyncError(async (req, res, next) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return next(new ErrorHandler("All fields are required.", 400));
  }

  const contact = new Contact({ name, email, message });
  await contact.save();

  res.status(201).json({ message: "Contact form submitted successfully." });
});




export const getAllMessages = catchAsyncError(async (req, res, next) => {
  const messages = await Contact.find().sort({ createdAt: -1 });

  res.status(200).json({
    status: "success",
    results: messages.length,
    data: messages,
  });
});

