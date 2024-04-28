import express from 'express'
import { create, getAll } from '../controllers/typesQuestionController.js'

const router = express.Router()

router.post('/create',create)
router.get('/getAll',getAll)

export default router

