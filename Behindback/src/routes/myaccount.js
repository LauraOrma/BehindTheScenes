const express = require('express')
const router = express.Router()

router.get('/', function (req, res, next) {
  res.render('myaccount', { title: 'My account' })
})
module.exports = router