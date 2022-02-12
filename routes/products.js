import express from 'express'
import content from '../middleware/content.js'
import auth from '../middleware/auth.js'
import admin from '../middleware/admin.js'
import upload from '../middleware/upload.js'
import {
  create,
  getProducts,
  getAllProducts,
  getProductById
} from '../controllers/products.js'

const router = express.Router()

router.post('/', auth, admin, content('multipart/form-data'), upload, create)
router.get('/', getProducts)
router.get('/', auth, admin, getAllProducts)
router.get('/:id', getProductById)

export default router
