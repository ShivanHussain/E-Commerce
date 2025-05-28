import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Product Name is Required!"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Product Description is Required!"],
        trim: true
    },
    price: {
        type: Number,
        required: [true, "Product Price is Required!"],
        min: 0
    },
    category: {
        type: String,
        required: [true, "Product Category is Required!"],
        trim: true
    },
    stock: {
        type: Number,
        required: [true, "Product Stock is Required!"],
        min: 0
    },
   image: {
    public_id: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
}, { timestamps: true });


const Product = mongoose.model("Product", productSchema);

export default Product;