
require('dotenv').config();


const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser'); 
const cookieParser = require('cookie-parser');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const authRoutes=require('./routes/authRoutes'); 
const adminRoutes=require('./routes/adminRoutes');  

const db =require('./config/db'); 


const app = express();








app.use(cors());
app.use(express.json())
app.use(morgan('dev'));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());





app.get('/', (req, res) => {
res.json({ message: 'API çalışıyor!' });
});
app.use('/api/auth',authRoutes)
app.use('/api',require('./routes/userRoutes')) 
app.use('/api',adminRoutes) 
app.use('/api',require('./routes/productRoutes'))
app.use('/api',require('./routes/cardRoute'))
app.use('/api',require('./routes/orderRoutes'))
app.use('/api',require('./routes/favoritesRoute'))


 db()


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
});
