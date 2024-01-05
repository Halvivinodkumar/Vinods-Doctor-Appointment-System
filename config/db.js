const mongoose = require('mongoose');

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log(`mongodb connected ${mongoose.connection.host}`)
    } catch (error) {
        console.log(`mongodb issue ${error}`)
    }
}

module.exports = connectDB