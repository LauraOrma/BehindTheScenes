const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const mysql = require('mysql');
const myConnection = require('express-myconnection');
//Login related routers
const apiRouter = require('./src/routes/api')
const indexRouter = require('./src/routes/index')
const signupRouter = require('./src/routes/signup')
const forgotPasswordRouter = require('./src/routes/forgotpassword')
//Login related routers
const userRouter = require('./src/routes/users')
const accountRouter = require('./src/routes/myaccount')
//Login related routers
const castingRouter = require('./src/routes/casting')

const cors = require('cors')
const app = express()
app.use(myConnection(mysql, {
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'behindscenes'
}, 'single'))

// view engine setup
app.set('views', path.join(__dirname, 'src', 'views'))
app.set('view engine', 'ejs')
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')));


app.use('/uploads', express.static('uploads'));
app.use('/', indexRouter)
app.use('/api', apiRouter)
//Login related routers
app.use('/signup', signupRouter)
app.use('/forgotpassword', forgotPasswordRouter)
//Users related routers
app.use('/users', userRouter)
app.use('/users/myaccount', accountRouter)
//Castings related routers
app.use('/casting', castingRouter)
//Company related routers

// 404 Errors
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  console.log(err)
  res.render('error')
})

module.exports = app
