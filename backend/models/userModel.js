const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const UserSchema = new mongoose.Schema({
name:{
    type:String,
    required:true,
},
email:{
    type:String,
    required:true,
    unique:true,    
},
password:{
    type:String,
    required:true,
},
role:{
    type:Boolean,
    default:false, 
},
favorites:[
  { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
]

 })

 
 UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });
  
  UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  };

  UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

  const User = mongoose.model('User', UserSchema);
  module.exports = User;