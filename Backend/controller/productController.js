import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/error.js";
import Product  from "../models/product.js";
import cloudinary from "cloudinary";


//for add the product
export const addProduct = catchAsyncError(async (req, res, next) => {


    if (!req.files || !req.files.image) {
        return next(new ErrorHandler("Product image is required!", 400));
    }

    const { image } = req.files;
    const cloudinaryResponse = await cloudinary.v2.uploader.upload(image.tempFilePath, {
        folder: "PRODUCT_IMAGE"
    });

    if (!cloudinaryResponse || cloudinaryResponse.error) {
        return next(new ErrorHandler("Image upload failed!", 500));
    }

    const {
        title,
        price,
        description,
        stock,
        category
    } = req.body;

    if (
        !title || !price || !description || !category  || !stock
    ) {
        return next(new ErrorHandler("All fields are required!", 400));
    }

    const product = await Product.create({
        title,
        price,
        description,
        stock,
        category,
        image: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url
        },
        user: req.user.id
    });

    res.status(201).json({
        success: true,
        message: "Product added successfully!",
    });
});




//for get all product
export const getALLProduct = catchAsyncError(async (req, res, next) => {

    const product = await Product.find();
    res.status(200).json({
        success: true,
        product
    })
});



//for get product by id
export const getProductById = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
        return next(new ErrorHandler("Product Not Found!", 404));
    }

    res.status(200).json({
        success: true,
        product
    })
});


//for delete the product
export const deleteProduct = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;


    const product = await Product.findById(id);

    if (!product) {
        return next(new ErrorHandler("Product Not Found!", 404));
    }

    const deleteProduct = await Product.findByIdAndDelete(id);

    res.status(200).json({
        success: true,
        message: "Product Deleted Successfully"
    })
});


//for get all product with optional query filters
export const getProductByFilter = catchAsyncError(async (req, res, next) => {
    const { searchTerm } = req.query;

    const query = {};
    const sortOption = { createdAt: -1 };

    if (searchTerm) {
        query.$or = [
            { title: { $regex: searchTerm, $options: "i" } },
            { category: { $regex: searchTerm, $options: "i" } }, 
            { description: { $regex: searchTerm, $options: "i" } } 
        ];
    }

    let products = await Product.find(query).sort(sortOption);

    res.status(200).json({
        success: true,
        count: products.length,
        products,
    });
});






//for update the product
export const editProduct = catchAsyncError(async (req, res, next) => {
  const productId = req.params.id;

  let product = await Product.findById(productId);
  if (!product) {
    return next(new ErrorHandler("Product not found!", 404));
  }

  const {
    title = product.title,
    price = product.price,
    description = product.description,
    stock = product.stock,
    category = product.category
  } = req.body;

  let newImageData = product.image; // default to existing image

  // If new image uploaded
  if (req.files && req.files.image) {
    const image = req.files.image;

    // Delete old image from Cloudinary
    await cloudinary.v2.uploader.destroy(product.image.public_id);

    // Upload new image
    const cloudinaryResponse = await cloudinary.v2.uploader.upload(image.tempFilePath, {
      folder: "PRODUCT_IMAGE"
    });

    if (!cloudinaryResponse || cloudinaryResponse.error) {
      return next(new ErrorHandler("Image upload failed!", 500));
    }

    newImageData = {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url
    };
  }

  // Update product fields
  product.title = title;
  product.price = price;
  product.description = description;
  product.stock = stock;
  product.category = category;
  product.image = newImageData;

  await product.save();

  res.status(200).json({
    success: true,
    message: "Product updated successfully!",
  });
});


