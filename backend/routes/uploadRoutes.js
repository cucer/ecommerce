const express = require('express')
const multer = require('multer')
const path = require('path')

// const userController = require('../controllers/userController')
// const auth = require('../middleware/authMiddleware')

const router = express.Router()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/') //null for error
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    ) //sondaki path ile dosyanın formatı neyse onu alır
  },
})

// içeri her türlü dosya upğload edilemesin diye filter koyacağız
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Error: Images only!')
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

router.post('/', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`)
})

// router
//   .route('/')
//   .post(userController.registerUser)
//   .get(auth.protect, auth.admin, userController.getUsers)

module.exports = router
