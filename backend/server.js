// ONLY COMMON JS
const express = require('express'),
  // products = require('./data/products'), // router eklendikten sonra gerek kalmadı
  dotenv = require('dotenv'),
  connectDB = require('./config/db'),
  colors = require('colors'),
  productRoutes = require('./routes/productRoutes'),
  userRoutes = require('./routes/userRoutes'),
  orderRoutes = require('./routes/orderRoutes'),
  uploadRoutes = require('./routes/uploadRoutes'),
  errorMiddleware = require('./middleware/errorMiddleware'),
  path = require('path'),
  morgan = require('morgan')

dotenv.config()

connectDB()

const app = express()

// we use Morgan generally in dev enviroment, not production
// we can see http requests in terminal
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// accepts json data and body(postman json)
app.use(express.json())

/*req, res we can add middleware to check req, res
app.use((req, res, next) => {
  console.log('URL', req.originalUrl)
  next()
})
*/

/*
app.get('/', (req, res) => {
  res.send('API is running')
})
*/

/* we transferred these codes to router
// api/products = http://localhost:5000/api/products
app.get('/api/products', (req, res) => {
  // we use "json" not "send". because products = json
  res.json(products)
})

app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id)
  res.json(product)
})
*/

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_API)
)

const dirname = path.resolve()
app.use('/uploads', express.static(path.join(dirname, '/uploads')))
// const __dirname = path.resolve()
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
// "__dirname" only in COMMON JS not use in ES modules

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(errorMiddleware.notFound)
app.use(errorMiddleware.errorHandler)

const PORT = process.env.PORT || 5000
const MODE = process.env.NODE_ENV

app.listen(
  PORT,
  console.log(`Server running in ${MODE} mode on port ${PORT}`.yellow.bold)
)
// yellow.bold comes from library, just for color, not necessary
