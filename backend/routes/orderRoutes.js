const express = require('express')
const orderController = require('../controllers/orderController')
const auth = require('../middleware/authMiddleware')

const router = express.Router()

router
  .route('/')
  .post(auth.protect, orderController.addOrderItems)
  .get(auth.protect, auth.admin, orderController.getOrders)

router.route('/myorders').get(auth.protect, orderController.getMyOrders)

router.route('/:id').get(auth.protect, orderController.getOrderById)

router.route('/:id/pay').put(auth.protect, orderController.updateOrderToPaid)

router
  .route('/:id/deliver')
  .put(auth.protect, auth.admin, orderController.updateOrderToDelivered)

module.exports = router
