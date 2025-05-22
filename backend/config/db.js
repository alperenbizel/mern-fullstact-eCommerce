const mongoose = require('mongoose');

const db=()=>{
    try {
        mongoose.connect(process.env.MONGO_URI).then(()=>
            console.log('MongoDB connected successfully')
        )
    } catch (error) {
        console.log(error)
    }
}

module.exports=db;