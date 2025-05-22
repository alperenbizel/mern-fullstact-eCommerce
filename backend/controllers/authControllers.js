const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

exports.register=asyncHandler(async (req, res) => {
    const {name, email, password} = req.body;
const userExists=await User.findOne({email});
if(userExists){
    return res.status(400).json({
         success: false, message: "Bu e-posta ile kayıtlı bir kullanıcı zaten var." 
        });

}
if(password.length < 6){
    return res.status(400).json({
        success: false, message: "Parola en az 6 karakter olmalıdır." 
       });
}

    const newUser=await User.create({
        name,
        email,
        password,
    });
    res.status(201).json({
        success:true,
        token:newUser.getSignedJwtToken(),
        user:{
            id:newUser._id,
            name:newUser.name,
            email:newUser.email,
            role:newUser.role,
        }
    });
})


exports.login=asyncHandler(async(req,res)=>{
    const {email ,password}=req.body;
    const alredyUser=await User.findOne({email});
    if(!alredyUser){
        return res.status(400).json({
            success:false,
            message:"Bu e-posta ile kayıtlı bir kullanıcı yok."
        })
    }
    if(!alredyUser.matchPassword(password)){
        return res.status(400).json({
            success:false,
            message:"Parola yanlış."
        })
    }
    res.status(200).json({
        success:true,
        token:alredyUser.getSignedJwtToken(),
        user:{
            id:alredyUser._id,
            name:alredyUser.name,
            email:alredyUser.email,
            role:User.role,
            token: alredyUser.getSignedJwtToken()
        }
    })
})
