const ProductModel =require('../models/products')
const asyncHandler = require("express-async-handler")

exports.addProduct=asyncHandler(async(req,res)=>{

    const  { name, description, price, category}=req.body;
    const images=req.files.map((file)=>({
        public_id: file.filename,
        url:file.path,
    }))
    const product =await ProductModel.create({
        name,
        description,
        price,
        images,
        category
    })
    res.status(201).json({
        success:true,
        data:product,
   
    })

})

exports.getproducts=asyncHandler(async(req,res)=>{
const products=await ProductModel.find()
res.status(200).json({
    success:true,
    count:products.length,
    data:products
})

})

exports.getProduct=asyncHandler(async(req,res)=>{

    const product=await ProductModel.findById(req.params.id)
    if(!product){
        res.status(404).json({
            success:false,
            message:"Product not found"
        })
    }else{
        res.status(200).json({
            success:true,
            data:product
        })
    }
})

exports.updateProduct=asyncHandler(async(req,res)=>{
const product=await ProductModel.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
    runValidators:true  })
    if(!product){
        res.status(404).json({
            success:false,
            message:"Product not found"
        })
    }
    res.status(201).json({
        success:true,
        data:product
    })


})

exports.deleteProduct=asyncHandler(async(req,res)=>{

    const product=await ProductModel.findByIdAndDelete(req.params.id)
    if(!product){
        return res.status(404).json({
            success:false,
            message:"Product not found"
        })
    }
   return  res.status(200).json({
        success:true,
        message:"Product deleted successfully"
    })
})