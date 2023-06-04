import express from 'express'
import {isLogin} from "../middlewares/auth/auth.js"
import {checkout,callbackUrl} from "../controllers/payment.js"

const router = express.Router()
router.post("/callback/:conversationId",callbackUrl)
router.use(isLogin)
router.post("/checkout/:orderId",checkout)




export default router
