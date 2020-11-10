const express = require('express')
const orderController = require('../controllers/orderController')
const auth = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/').post(auth.protect, orderController.addOrderItems)
router.route('/myorders').get(auth.protect, orderController.getMyOrders)
router.route('/:id').get(auth.protect, orderController.getOrderById)
router.route('/:id/pay').put(auth.protect, orderController.updateOrderToPaid)

module.exports = router
