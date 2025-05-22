const express=require('express');
const {addFavorite,removeFavorite,listFavorites}=require('../controllers/favorites');
const router=express.Router()
const project=require('../middleware/authMidleware')

router.get('/favlist',project,listFavorites);
router.post('/addfavorite',project,addFavorite)
router.delete('/deletefav/:productId',project,removeFavorite)


module.exports = router;

