const express = require('express')
const productController = require('../controllers/productController')
const auth = require('../middleware/authMiddleware')

const router = express.Router()

router
  .route('/')
  .get(productController.getProducts)
  .post(auth.protect, auth.admin, productController.createProduct)

router
  .route('/:id/reviews')
  .post(auth.protect, productController.createProductReview)

router.get('/top', productController.getTopProducts)

router
  .route('/:id')
  .get(productController.getProductById)
  .delete(auth.protect, auth.admin, productController.deleteProduct)
  .put(auth.protect, auth.admin, productController.updateProduct)

module.exports = router
