const express = require('express')
const productController = require('../controllers/productController')
const auth = require('../middleware/authMiddleware')

const router = express.Router()

/*Controller kullancağımız için iptal
// @desc   Fetch all products
// @route  GET /api/products
// @access Public
router.get(
  '/', // başındaki /api/products pathlerini buraya eklemedik çünkü server dosyası içinde bu routerı çağırırken orada veriliyor
  asyncHandler(async (req, res) => {
    const products = await Product.find({})
    // express-async-handler sayesinde express içinde try catch kullanmak zorunda kalmıyoruz
    res.json(products)
  })
)

// @desc   Fetch single product
// @route  GET /api/products/:id
// @access Public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    //   const product = products.find((p) => p._id === req.params.id)
    const product = await Product.findById(req.params.id)
    if (product) {
      res.json(product)
    } else {
      // res.status(404).json({ message: 'Product Not Found' })
      res.status(404)
      // buradan çıkan mesaj errorHandler middlewaremize gidecek, oradan gösterilecek, çünkü artık error için bir middlewaremiz var burada throw error kullanabiliriz
      throw new Error('Product not found')
    }
  })
)
*/

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
