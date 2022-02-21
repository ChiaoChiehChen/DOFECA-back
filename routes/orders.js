import express from 'express'
import content from '../middleware/content.js'
import auth from '../middleware/auth.js'
import admin from '../middleware/admin.js'

import {
  checkout,
  getMyOrders,
  getAllOrders
} from '../controllers/orders.js'

const router = express.Router()

router.post('/', auth, content('application/json'), checkout)
router.get('/orders/me', auth, getMyOrders)
router.get('/orders/all', auth, admin, getAllOrders)
