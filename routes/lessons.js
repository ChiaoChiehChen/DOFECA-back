import express from 'express'
import content from '../middleware/content.js'
import auth from '../middleware/auth.js'
import admin from '../middleware/admin.js'

import {
  lessonsCreate,
  getLessons,
  getAllLessons
  // getMyLessons,
  // delLessons
} from '../controllers/products.js'

const router = express.Router()

// 新增
router.post('/', auth, admin, content('application/json'), lessonsCreate)
// 所有課程
router.get('/', getLessons)
router.get('/all', auth, admin, getAllLessons)
// router.get('/myLessons', getMyLessons)
// router.delete('/:id', auth, admin, delLessons)

export default router
