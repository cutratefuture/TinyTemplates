require('dotenv').config()

const mongoose = require('mongoose')
const uri = process.env.MONGODB_URI
const connectDB = () => {
  mongoose.connect(`${uri}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })

}

module.exports = connectDB
