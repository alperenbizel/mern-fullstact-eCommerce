const User = require('../models/userModel');
const Product = require('../models/products');
const asyncHandler = require("express-async-handler");


exports.addFavorite = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
  }

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: 'Ürün bulunamadı' });
  }

 
  const alreadyFavorite = user.favorites.some(
    (favId) => favId.toString() === productId
  );

  if (!alreadyFavorite) {
    user.favorites.push(productId);
    await user.save();
    return res.status(200).json({ message: 'Ürün favorilere eklendi' });
  } else {
    return res.status(400).json({ message: 'Ürün zaten favorilerde.' });
  }
});

exports.removeFavorite=asyncHandler(async(req,res)=>{
    const userId=req.user.id;
    const productId = req.params.productId;


    const user=await User.findById(userId);
    if(!user){
       return res.status(404).json({ message: 'Kullanıcı bulunamadı' });  
    }
    const index=user.favorites.findIndex(
        (favId)=>favId.toString()===productId
    );
    if(index=== -1){
           return res.status(400).json({ message: 'Ürün favorilerde bulunamadı' });
    }
    user.favorites.splice(index, 1);
  await user.save();

  res.status(200).json({ message: 'Ürün favorilerden çıkarıldı' });
})

exports.listFavorites = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const user = await User.findById(userId).populate('favorites');
  if (!user) {
    return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
  }

  res.status(200).json(user.favorites);
});
