const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require('bcryptjs');

exports.updateProfile= asyncHandler(async(req,res)=>{
    const updates ={
        name: req.body.name,
        email: req.body.email,
    }

    const user=await User.findByIdAndUpdate(req.user.id,updates,
        {
            new:true,
runValidators:true,
        });
        res.status(200).json({
            success:true,
            data:user,
        })
})

exports.getMe = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id); 
    if (!user) {
        res.status(404).json({
            success: false,
            message: "User not found"
        });
    } else {
        res.status(200).json({
            success: true,
            data: user
        });
    }
});

exports.getUsers=asyncHandler(async(req,res)=>{
    
const users = await User.find();
res.status(200).json({
    success:true,
    count:users.length,
    data:users
})
})

exports.createAdminUser = async (req, res) => {
    const { name, email, password } = req.body;
    
    try {
       
        const hashedPassword = await bcrypt.hash(password, 10);

      
        const user = await User.create({
            name,
            email,
            password: hashedPassword,  
            role: true,  
        });

        res.status(201).json({
            success: true,
            data: user,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.adminPages= asyncHandler(async(req,res)=>{
    const user= await User.findById(req.user.id);
    const admin = await User.findOne({ _id: req.user.id, role: true });
    if(!user || !admin){
        return res.status(404).json({success:false})
    }
res.status(201).json({
    success:true,
    data:user
})
})