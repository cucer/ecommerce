// ONLY COMMON JS
const express = require('express'),
  // products = require('./data/products'), // router eklendikten sonra gerek kalmadı
  dotenv = require('dotenv'),
  connectDB = require('./config/db'),
  colors = require('colors'),
  productRoutes = require('./routes/productRoutes'),
  userRoutes = require('./routes/userRoutes'),
  orderRoutes = require('./routes/orderRoutes'),
  errorMiddleware = require('./middleware/errorMiddleware')

dotenv.config()

connectDB()

const app = express()

// gönderilen json data ve bodyleri kabul eder, örneğin mail auth için postmanden json yollanması
app.use(express.json())

/*req, res kontrol edebilmek veya okuyabilmek için middleware ekleyebiliriz
app.use((req, res, next) => {
  console.log('URL', req.originalUrl)
  next()
})
*/

app.get('/', (req, res) => {
  res.send('API is running')
})

/* BURDAKİ KODLAR ROUTER içine alındı
// api/products yazarak pathi biz belirlemiş olduk, http://localhost:5000/api/products gidersen json görürsün
app.get('/api/products', (req, res) => {
  // gelen data json olacağı için send değil json kullandık
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

app.use(errorMiddleware.notFound)
app.use(errorMiddleware.errorHandler)

const PORT = process.env.PORT || 5000
const MODE = process.env.NODE_ENV

app.listen(
  PORT,
  console.log(`Server running in ${MODE} mode on port ${PORT}`.yellow.bold)
)
// yellow.bold yüklediğimiz colors libraryden geliyor, renk vermek için, şart değil
