const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')

// @desc   Fetch all products
// @route  GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  // express-async-handler sayesinde express içinde try catch kullanmak zorunda kalmıyoruz
  res.json(products)
})

// @desc   Fetch single product
// @route  GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
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

module.exports = { getProducts, getProductById }
