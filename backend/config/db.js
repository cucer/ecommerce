const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // console warnings
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    // cyan.underline yüklediğimiz colors libraryden geliyor, renk vermek için, şart değil
  } catch (error) {
    console.log(`MongoDB Connection Error: ${error.message}`.red.underline.bold)
    // red.underline.bold yüklediğimiz colors libraryden geliyor, renk vermek için, şart değil
    process.exit(1) //1 exit with failure demek
  }
}

module.exports = connectDB
