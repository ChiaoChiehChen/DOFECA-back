import express from 'express'
import content from '../middleware/content.js'
import auth from '../middleware/auth.js'
import admin from '../middleware/admin.js'

import {
  subscriber,
  subscribeDetail
} from '../controllers/subscribes'

const router = express.Router()

router.post('/', content('application/json'), subscriber)
router.get('/all', auth, admin, subscribeDetail)

export default router
