const express =require('express')
const router=express.Router()
const {getProduct,getproducts}=require('../controllers/productControllers')

router.get('/products',getproducts);
router.get('/product/:id',getProduct);


module.exports=router;