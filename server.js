const express = require('express');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');
const { login, register } = require('./routes/userRoutes');
const dotenv = require('dotenv').config();
const path = require('path');


//mongo connection
connectDB();

//rest object//

const app = express();


//middlewares

app.use(express.json());//for parsing application/json
app.use(morgan('dev'));

//routes

app.use('/api/v1/user',require('./routes/userRoutes'));
app.use('/api/v1/admin',require('./routes/adminRoutes'))
app.use('/api/v1/doctor',require('./routes/doctorRoutes'))

//static files

app.use(express.static(path.join(__dirname, './client/build')))

app.get('*', function(req,res){
    res.sendFile(path.join(__dirname, './client/build/index.html'))
})

//port

const port = process.env.PORT || 8000

//listen server

app.listen(port,()=>{
    console.log(`server running in ${process.env.NODE_MODE} mode in ${process.env.PORT}`)
})