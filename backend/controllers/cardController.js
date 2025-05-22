const asyncHandler = require('express-async-handler');
const cartModel = require('../models/card');

exports.getCart = asyncHandler(async (req, res) => {
    const cart = await cartModel.findOne({ user: req.user.id })
      .populate('cartItems.product', 'name price image'); 
  
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Sepet bulunamadı.' });
    }
  

    console.log('get cart',cart);  
  
    res.status(200).json({
      success: true,
      data: cart
    });
  });
  


  exports.addToCart = asyncHandler(async (req, res) => {
    const { product, quantity, name, price, image } = req.body;
  

    console.log("Gelen ürün verisi:", req.body);
  
    let cart = await cartModel.findOne({ user: req.user.id });
  
  
    if (!cart) {
      cart = new cartModel({ user: req.user.id, cartItems: [] });
    }
  

    const idx = cart.cartItems.findIndex(item => item.product.toString() === product.toString());
    if (idx > -1) {
      console.log("Var olan ürün bulundu, miktar artırılıyor...");
      cart.cartItems[idx].quantity += quantity;
    } else {
      console.log("Yeni ürün ekleniyor:", { product, name, price, quantity, image });
      cart.cartItems.push({ product, name, price, quantity, image });
    }

    cart.totalPrice = cart.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    console.log("Toplam fiyat güncelleniyor:", cart.totalPrice);
  
   
    await cart.save();
  
    res.status(200).json({ success: true, data: cart });
  });
  
  

exports.removeFromCart = asyncHandler(async (req, res) => {
  const { product } = req.params;
  let cart = await cartModel.findOne({ user: req.user.id });
  
  if (!cart) {
    return res.status(404).json({ success: false, message: 'Sepet bulunamadı.' });
  }

  cart.cartItems = cart.cartItems.filter(item => item.product.toString() !== product);

  cart.totalPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  await cart.save();
  
  res.status(200).json({
    success: true,
    data: cart
  });
});
