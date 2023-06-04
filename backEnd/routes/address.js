import express from "express"
import {addAddress,editAddress,getByUserIdAddress,getByIdAddress,deleteAddress} from "../controllers/address.js"
import {isLogin} from "../middlewares/auth/auth.js"



const router =express.Router()
router.use(isLogin)
router.get("/",getByUserIdAddress)
router.get("/:addressId",getByIdAddress)
router.post("/add-address",addAddress)
router.put("/edit-address/:addressId",editAddress)
router.delete("/delete-address/:addressId",deleteAddress)






export default router
