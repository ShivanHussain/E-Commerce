
import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  image:{ 
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  image: String,
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [orderItemSchema],

    paymentDetails: {
      id: {
        type: String,
        required: true,
      },
      transactionId: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      amountInINR: {
        type: Number,
        required: true,
      },
      amountInUSD: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
        enum: ["Pending", "Completed", "Failed"],
        default: "Completed",
      },
      create_time: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        default: "PayPal",
      },
    },

    shippingAddress: {
      phone: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      zipcode: {
        type: String,
        required: true,
      },
      fullName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },

    status: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered", "Cancelled","Processing"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
