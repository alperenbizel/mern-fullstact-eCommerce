const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { validate } = require("../middleware/validateMiddleware");
const {register,login} =require("../controllers/authControllers")
const {createAdminUser}= require('../controllers/userControllers')
router.post('/register',
    [
        check("email", "Geçerli bir email girin").isEmail(),
        check("password", "Parola en az 6 karakter olmalı").isLength({ min: 6 })
    
    ],
    validate,
      register
)

router.post('/login', login)
router.post('/admin',createAdminUser)

module.exports=router;