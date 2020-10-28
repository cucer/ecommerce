const express = require('express')
const userController = require('../controllers/userController')
const protect = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/').post(userController.registerUser)
router.post('/login', userController.authUser)

router
  .route('/profile')
  .get(protect, userController.getUserProfile)
  .put(protect, userController.updateUserProfile)
// router.route('/profile').get(protect, userController.getUserProfile) //middleware var ama bu seferde update user eklenmemiş hali
// router.route('/profile').get(userController.getUserProfile) //middlewaresiz hali

module.exports = router
