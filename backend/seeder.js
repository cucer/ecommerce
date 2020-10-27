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
    //   önce temizlieyelim sonra import ederiz
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)

    const adminUser = createdUsers[0]._id //user dosyasında manuel olarak ilk kişiyi admin yaptığımız için atamayı böyle yaptık

    const sampleProducts = products.map((product) => {
      // her biri producta adminuser ekleyeceğim dedi anlamadım
      return { ...product, user: adminUser } /// ...product demek varolan productlar demek, sonra da user olarak adminUserı atadı, mongoya atarken user olarak admini yollayacak field olarak
    })

    // yukarıdaki örnek datayı insert edecek
    await Product.insertMany(sampleProducts)

    console.log('Data Imported'.green.inverse)
    process.exit()
  } catch (error) {
    console.log(`Data Import Error: ${error}`.red.inverse)
    process.exit(1) // 1 failure demek
  }
}

const destroyData = async () => {
  try {
    //   sadece temizleme
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('Data Destroyed'.red.inverse)
    process.exit()
  } catch (error) {
    console.log(`Data Destroy Error: ${error}`.red.inverse)
    process.exit(1) // 1 failure demek
  }
}

// dışarıdan çağırırken node backend/seeder -d  yazılırsa buradaki -d destroyData demek
// process.argv[2]

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
