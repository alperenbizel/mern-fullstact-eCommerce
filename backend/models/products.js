const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        required: true,
        trim: true
    },
    price:{
        type:Number,
        required: true,
        min: 0
    },
    category:{
      type: String,
      required: true,
      enum: ['Akıllı Ev', 'Giyilebilir Teknoloji', 'Diğer'],
    },
    images:[
        {
            public_id: { type: String, required: true },
            url: { type: String, required: true },
        }
    ],

},{timestamps: true});
const ProductModel =mongoose.model('Product',ProductSchema);
module.exports=ProductModel;