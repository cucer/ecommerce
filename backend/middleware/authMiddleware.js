const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')

// Validate token middleware
// middleware function req, res, next
const protect = asyncHandler(async (req, res, next) => {
  let token

  // console.log('authorization', req.headers.authorization)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1] //Bearer kelimesinden sonraki indexi al demek, yeni gönderilen tokenı

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // console.log('decoded', decoded)

      req.user = await User.findById(decoded.id).select('-password')
      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

const admin = (req, res, next) => {
  // console.log('admin', req.user)
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an admin')
  }
}

module.exports = { protect, admin }
