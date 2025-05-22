const express =require('express');
const router= express.Router();
const {getMyOrders,createOrder,getOrderById}=require('../controllers/orderControllers')
const project =require('../middleware/authMidleware')

router.get('/getmyorders',project,getMyOrders);
router.get('/order/:id',project,getOrderById)
router.post('/order',createOrder)

module.exports=router