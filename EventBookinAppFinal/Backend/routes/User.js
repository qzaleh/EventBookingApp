const express = require('express')
const router = express.Router()

const UserController = require('../Controllers/UserController')


router.get('/', UserController.index)
router.post('/show', UserController.show)
router.post('/store', UserController.store)
router.post('/update', UserController.update)
router.post('/delete', UserController.terminate)

module.exports = router