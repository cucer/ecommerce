const jwt = require('jsonwebtoken')

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    // options
    expiresIn: '30d', // expire time 30 day
  })
}

module.exports = generateToken
