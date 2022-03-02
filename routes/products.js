import express from 'express'
import content from '../middleware/content.js'
import auth from '../middleware/auth.js'
import admin from '../middleware/admin.js'
import upload from '../middleware/upload.js'

import {
  create,
  getProducts,
  getAllProducts,
  getProductById,
  delProduct,
  updateProductById
} from '../controllers/products.js'

const router = express.Router()

router.post('/', auth, admin, content('multipart/form-data'), upload, create)
router.get('/', getProducts)
// 全部商品(管理者)
router.get('/all', auth, admin, getAllProducts)
router.get('/:id', getProductById)
router.delete('/:id', auth, admin, delProduct)
router.patch('/:id', auth, admin, content('multipart/form-data'), upload, updateProductById)

export default router
