import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true },
});

// Virtual for originalPrice
productSchema.virtual('originalPrice').get(function() {
    return Math.round(this.price / (1 - this.discount/100));
});

export default mongoose.model("Product", productSchema);
