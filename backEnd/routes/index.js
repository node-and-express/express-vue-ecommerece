import express from "express"
import categoryRouter from "./category.js"
import productRouter from "./product.js"
import authRouter from  "./auth.js"
import orderRouter from "./order.js"
import address from "./address.js"
import payment from "./payment.js"
import user from "./user.js"
const router =express.Router()

router.use("/category",categoryRouter)
router.use("/product",productRouter)
router.use("/auth",authRouter)
router.use("/order",orderRouter)
router.use("/address",address)
router.use("/payment",payment)
router.use("/user",user)



export default router
