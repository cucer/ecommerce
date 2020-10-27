const jwt = require('jsonwebtoken')

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    //   Burası options kısmı, 3.parametre options
    expiresIn: '30d', // 30 day verdik örnek, token expire süresi burası
  })
}

module.exports = generateToken
