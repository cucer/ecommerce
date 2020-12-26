const mongoose = require('mongoose'),
  dotenv = require('dotenv'),
  colors = require('colors'),
  users = require('./data/users'),
  products = require('./data/products'),
  User = require('./models/userModel'),
  Product = require('./models/productModel'),
  Order = require('./models/orderModel'),
  connectDB = require('./config/db')

dotenv.config()

connectDB()

const importData = async () => {
  try {
    // first clean up then import
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)

    const adminUser = createdUsers[0]._id // we set first person as an admin in user file

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser } /// ...product means existing products, while inserting mongo we will send adminuser
    })

    await Product.insertMany(sampleProducts)
    console.log('Data Imported'.green.inverse)
    process.exit()
  } catch (error) {
    console.log(`Data Import Error: ${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    // clean up
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('Data Destroyed'.red.inverse)
    process.exit()
  } catch (error) {
    console.log(`Data Destroy Error: ${error}`.red.inverse)
    process.exit(1)
  }
}

// node backend/seeder -d, -d means destroyData
// process.argv[2]

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
