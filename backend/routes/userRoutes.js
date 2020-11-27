const express = require('express')
const userController = require('../controllers/userController')
const auth = require('../middleware/authMiddleware')

const router = express.Router()

router
  .route('/')
  .post(userController.registerUser)
  .get(auth.protect, auth.admin, userController.getUsers)

router.post('/login', userController.authUser)

router
  .route('/profile')
  .get(auth.protect, userController.getUserProfile)
  .put(auth.protect, userController.updateUserProfile)

router
  .route('/:id')
  .delete(auth.protect, auth.admin, userController.deleteUser)
  .get(auth.protect, auth.admin, userController.getUserById)
  .put(auth.protect, auth.admin, userController.updateUser)

module.exports = router
