const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('forgotpassword', { title: 'Forgot password' });
});
module.exports = router;
