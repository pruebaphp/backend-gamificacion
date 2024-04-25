import express from 'express'
import auth from '../middlewares/auth.js'
import { getAll, sendMessage } from '../controllers/messagesController.js'

const router = express.Router()

router.get('/getAll',auth, getAll)
router.post('/send',auth, sendMessage)

export default router

