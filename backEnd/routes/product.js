import express from 'express'
import multer from "multer"
const upload = multer({ dest: 'public/uploads/' });
import productImageMuter from '../middlewares/libraries/multer/productImage.js'
import joiValidator from '../middlewares/libraries/joi/joi.js'
import productJoiSchema from '../helpers/joi/productSchema.js'
import { isAdmin, isLogin } from '../middlewares/auth/auth.js'
import productsQuery from '../middlewares/query/productQuery.js'
import productsByCategoryQuery from '../middlewares/query/productsByCategoryQuery.js'
import {
    addProduct,
    deleteProduct,
    editProduct,
    getProducts,
    getBySlugProduct,
    getProductsByCategory,
    getNewArrivalsProducts,
    getQuickViewProduct,
    allProducts,
} from '../controllers/product.js'

const router = express.Router()


router.get('/', productsQuery, getProducts)

router.get('/allProducts', allProducts)

router.get('/category/:slugCategory', productsByCategoryQuery, getProductsByCategory)

router.get('/quick-view/:productId', getQuickViewProduct)

router.get('/new-arrivals', getNewArrivalsProducts)

router.get('/:slugProduct', getBySlugProduct)

router.use(isLogin)
router.use(isAdmin)

router.post('/',
    //productImageMuter.single('image'),
    upload.single('image'),
    joiValidator(productJoiSchema),
    addProduct,
)
router.put('/:productId',
    productImageMuter.single('image'),
    joiValidator(productJoiSchema),
    editProduct,
)
router.delete('/:productId', deleteProduct)


export default router
