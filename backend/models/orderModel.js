const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    orderItems:[
        {
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            name:{
                type: String,
                required: true,
            },
            price:{
                type: Number,
                required: true,
            },
            quantity:{
                type: Number,
                min: 1,
                max: 100,
                required: true,
            },
            image:{
                type: String,
                required: true,
            },
        }
    ],
    shippingInfo:{
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
        phoneNumber: { type: String, required: true },
      },
      paymentInfo: {
        id: { type: String },
        status: { type: String },
      
    },
    orderStatus: {
        type: String,
        enum: ['Beklemede', 'Onaylandı', 'Kargoda', 'Teslim Edildi', 'İptal Edildi'],
        default: 'Beklemede',
      },
      deliveredAt: { type: Date },
      createdAt: { type: Date, default: Date.now },
    
},{timestamps: true});

module.exports = mongoose.model("Order", orderSchema);