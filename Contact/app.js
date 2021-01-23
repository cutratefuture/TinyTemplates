require('dotenv').config() //dotenv reqires priority in load order, place as early as possible in the file
// requirements
const express = require('express')
const createError = require('http-errors')
const path = require('path')
const indexRouter = require('./routes/index')
const expressLayouts = require('express-ejs-layouts')
const logger = require('morgan') //terminal messages
const flash = require('connect-flash') // requires session for ui msg
const session = require('express-session') // for flash
const connectDB = require('./config/db') //for db connection
const app = express() //required for middleware operations
connectDB() //mongoose connection
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
app.use(
  //express session
  session({
    secret: 'super-secret',
    resave: false,
    saveUninitialized: true,
  })
)
//connect flash for login/register error messages
app.use(flash())
app.use((req, res, next) => {
  //part of ui messages
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error')
  next()
})
//ejs setup
app.set('view engine', 'ejs') // use ejs
app.use(expressLayouts) //use layout.ejs instead of single page index format
app.use(logger('dev')) //logger
app.use(express.json()) // for blog crud operation
app.use(express.urlencoded({ extended: false })) // for json parsing
app.set('views', path.join(__dirname, 'views')) //require path
app.use(express.static(path.join(__dirname, 'public'))) //require path
app.use('/', indexRouter)
app.use('/messages', indexRouter) //handles contact form
// Handle 404
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
})

