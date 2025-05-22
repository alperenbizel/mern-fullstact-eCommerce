const express=require('express');
const {addToCart,getCart,removeFromCart}=require('../controllers/cardController')
const router=express.Router()
const project=require('../middleware/authMidleware')

router.post('/addtocart',project,addToCart);
router.get('/getcart',project,getCart);
router.delete('/removecart/:product',project,removeFromCart)


module.exports=router;