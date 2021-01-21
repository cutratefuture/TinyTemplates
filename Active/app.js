require('dotenv').config() //dotenv reqires priority in load order, place as early as possible in the file
// requirements
const express = require('express')
const createError = require('http-errors')
const path = require('path')
const indexRouter = require('./routes/index')
const expressLayouts = require('express-ejs-layouts')
const logger = require('morgan') //terminal messages
const app = express() //required for middleware operations
// START SERVER
const LOCAL = process.env.LOCAL || 'localhost'
const PORT = process.env.PORT || '5400'
const NODE_ENV = process.env.NODE_ENV
app.set('port', PORT)
app.listen(PORT, (err) => {
  if (err) throw err
  console.log(`${NODE_ENV} server started...`)
  console.log(`http://localhost:${PORT}`)
  console.log(`http://${LOCAL}:${PORT}`)
})
// END SERVER
//ejs setup
app.set('view engine', 'ejs') // use ejs
app.use(expressLayouts) //use layout.ejs instead of single page index format
app.use(logger('dev')) //logger
app.set('views', path.join(__dirname, 'views')) //require path
app.use(express.static(path.join(__dirname, 'public'))) //require path
app.use('/', indexRouter)
// Handle 404
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
})

