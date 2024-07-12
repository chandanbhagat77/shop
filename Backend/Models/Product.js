const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,

    },
    price: {
        type: Number,
        required: true
    },
    shortDescription: {
        type: String,
        required: true,
        trim: true
    },
    longDescription: {
        type: String,
        required: true,
        trim: true
    },
    material: {
        type: [String],
        required: true,
        trim: true
    },
    sizes: {
        type: [String],
        required: true,
    },
    colors: {
        type: [String],
    },
    images: {
        type: [String], // Array of image URLs
        required: true
    },
    coverImage: {
        type: String, // Array of image URLs
        required: true
    },
    features: {
        type: [String],
        required: true
    },
    shippingDetails: {
        type: String, // Array of image URLs
        required: true
    },
    returnDetails: {
        type: String, // Array of image URLs
        required: true
    },


    category: {
        type: [String],
        required: true,

    },
    colorCategory: {
        type: String,
        required: true,

    },

    careInstructions: {
        type: String,
        required: true,

    },
    madeIn: {
        type: String,
        required: true,

    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },

    status: {
        type: String,
        enum: ["in stock", "out of stock"],
        default: "in stock"
    },
    brand: {
        type: String,
        trim: true
    },

    ratings: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    ratingCount: {
        type: Number,

    },
    review: {
        type: [mongoose.mongo.ObjectId],
        ref: "Review"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

    hidden: {
        type: Boolean,

    },
    orderedByCount: {
        type: Number
    },
    discount: {
        type: Number,
    },
    hide: {
        type: Boolean,
        default: false
    }

});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;