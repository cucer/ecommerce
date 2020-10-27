const express = require('express')
const userController = require('../controllers/userController')
const protect = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/').post(userController.registerUser)
router.post('/login', userController.authUser)
// router.route('/profile').get(userController.getUserProfile) //middlewaresiz hali
router.route('/profile').get(protect, userController.getUserProfile)

module.exports = router
