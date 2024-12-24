import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ['Credit Card', 'Debit Card', 'PayPal', 'Cash on Delivery'],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Completed', 'Failed'],
      default: 'Pending',
    },
    shippingAddress: {
      type: String,
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled', 'Returned'],
      default: 'Processing',
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    returnDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);
