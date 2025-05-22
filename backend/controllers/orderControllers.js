const orderModel =require('../models/orderModel')
const asyncHandler = require('express-async-handler')

exports.createOrder=asyncHandler(async(req,res)=>{
    const orderData={
        user:req.user.id,
        orderItem:req.body.orderItems,
        shippingInfo:req.body.shippingInfo,
        paymentInfo:req.body.paymentInfo,    
        orderStatus: 'Beklemede',
    }

    const order=await orderModel.create(orderData)
    res.status(200).json({
        success:true,
        data:order,
    })
})

exports.getMyOrders=asyncHandler(async(req,res)=>{
    const orders=await orderModel.find({user:req.user.id})
    if(orders.length === 0){
       return  res.status(200).json({
            success:true,
            message:'Sipariş ettiğiniz ürün bulunmuyor.'
        })
    }
    res.status(200).json({
        success:true,
        count: orders.length,
        data:orders,
    })
})
exports.getOrderById = asyncHandler(async (req, res) => {
    const order = await orderModel
      .findById(req.params.id)
      .populate('user', 'name email')
  
  
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Sipariş bulunamadı'
      })
    }
  
   
    if (order.user._id.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Bu siparişi görüntüleme yetkiniz yok.'
      })
    }
  
    res.status(200).json({
      success: true,
      data: order
    })
  })
  

exports.updateOrderStatus=asyncHandler(async(req,res)=>{
    const {status}=req.body;
    const order=await orderModel.findByIdAndUpdate(
        req.params.id,
        {orderStatus:status},
        {new:true,runValidators:true}
    );
    if(!order){
        return res.status(404).json({
            success:false,
            message:'sipariş bulumadı'
        })
    }

    res.status(200).json({
        success:true,
        data:order
    })
})