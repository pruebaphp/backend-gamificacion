import express from 'express'
import { create, get } from '../controllers/subsectionsController.js'

const router = express.Router()

router.post('/create',create)
router.get('/get/:section_id',get)

export default router

