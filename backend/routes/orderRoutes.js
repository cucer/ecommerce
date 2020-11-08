const express = require('express')
const orderController = require('../controllers/orderController')
const protect = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/').post(protect, orderController.addOrderItems)
router.route('/myorders').get(protect, orderController.getMyOrders)
router.route('/:id').get(protect, orderController.getOrderById)
router.route('/:id/pay').put(protect, orderController.updateOrderToPaid)

module.exports = router
