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
    // cyan.underline comes from library, just for color, not necessary
  } catch (error) {
    console.log(`MongoDB Connection Error: ${error.message}`.red.underline.bold)
    // red.underline.bold comes from library, just for color, not necessary
    process.exit(1) //1 = exit with failure
  }
}

module.exports = connectDB
