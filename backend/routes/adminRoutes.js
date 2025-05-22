


const express = require('express');
const router = express.Router();
const  User  = require('../models/userModel'); 
const  Order  = require('../models/orderModel')
const  Product = require('../models/products')
const { getUsers, adminPages } = require('../controllers/userControllers');
const { updateOrderStatus } = require('../controllers/orderControllers');
const { addProduct, deleteProduct, updateProduct } = require('../controllers/productControllers');
const project = require('../middleware/authMidleware');
const isAdmin = require('../middleware/isAdmin');
const upload = require('../middleware/multer');





router.get('/getusers',project,isAdmin, getUsers);
router.post('/update', project,isAdmin,updateOrderStatus);
router.post('/addproduct',project,isAdmin, upload.array('images', 5), addProduct);
router.delete('/deleteproduct/:id',project,isAdmin, deleteProduct);
router.post('/updateproduct', project,isAdmin,updateProduct);
router.get('/adminpages',project,isAdmin, adminPages);


router.get('/stats', async (req, res) => {
    try {
        const [totalUsers, totalProducts, revenueResult] = await Promise.all([
            User.countDocuments(),
            Product.countDocuments(),
            Order.aggregate([
                { 
                    $group: { 
                        _id: null, 
                        total: { $sum: "$totalPrice" } 
                    } 
                }
            ])
        ]);

        res.json({
            totalUsers,
            totalProducts,
            totalRevenue: revenueResult[0]?.total || 0
        });
        
    } catch (error) {
        console.error("Stats error:", error);
        res.status(500).json({ 
            message: "İstatistikler alınamadı",
            error: process.env.NODE_ENV === 'development' ? error.message : null
        });
    }
});

module.exports = router;