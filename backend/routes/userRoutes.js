const express =require("express")
const router = express.Router()
const {getMe,updateProfile}=require("../controllers/userControllers")
const project = require("../middleware/authMidleware")

router.get("/me",project,getMe)
router.post("/update",project,updateProfile)

module.exports=router