const mongoose = require("mongoose");   

const cardSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
cartItems:[
    {
        product:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        name:{
            type: String,
            required: true
        },
        quantity:{
            type: Number,
            required: true,
            default: 1
        },
        price:{
            type: Number,
            required: true
        },
        image:{
            type: String,
            required: true
        },
        

    }
    
],
totalPrice: { type: Number, required: true, default: 0.0 },
createdAt: { type: Date, default: Date.now },
},{ timestamps: true });

const Cart = mongoose.model('Cart', cardSchema);
module.exports = Cart;
