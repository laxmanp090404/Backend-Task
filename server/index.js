const express = require('express')
const app = express()
const morgan = require('morgan')
require('dotenv').config()

const PORT = process.env.PORT || 5000;

try {
    app.listen(PORT,()=>{
        console.log(`Server is running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgMagenta.black);
    })
    
} catch (error) {
    console.log(error);
    console.log('Failed to listen');
}