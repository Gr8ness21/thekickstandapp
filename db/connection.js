require('dotenv').config()
const mongoose = require('mongoose')

if(process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI)
} else {
    mongoose.connect('mongodb://localhost/kickstand_app')
}

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error: ', err)
    process.exit(-1)
})

mongoose.connection.once('open', () => {
    console.log("Gr8ness made Mongoose has connected to MongoDB")
})

module.exports = mongoose