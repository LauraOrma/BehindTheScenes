const express = require('express')
const router = express.Router()
const castingController = require('../controllers/castingController')

router.get('/', castingController.list)
router.post('/add', castingController.save)
router.post('/edit', castingController.edit)
router.post('/del', castingController.delete)

module.exports = router
