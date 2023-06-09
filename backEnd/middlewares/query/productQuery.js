import {
    filterQueryMethod,
    sortQueryMethod,
    paginationQueryMethod,
} from '../../helpers/query/queryMethods.js'
import ProductModel from '../../models/product.js'

export default async (req, res, next) => {
    try {
        let searchCount, defaultCount
        let query = ProductModel.find().populate({path:"category",select:"category"})
        const filterKeys = ['gender', 'color', 'name', 'price']
        const filterObject = filterQueryMethod(filterKeys, query, req) //search query
        if (filterObject.filter) {
            searchCount = await ProductModel.countDocuments(filterObject.filter)
        } else {
            defaultCount = await ProductModel.countDocuments()
        }

        query = filterObject.query
        query = sortQueryMethod(req, query)
        const paginationObject = paginationQueryMethod(
            searchCount || defaultCount,
            req,
            query
        )
        query = paginationObject.query
        req.getProductsQuery = query
        req.isEndIndex = paginationObject.isEndIndex
        console.log(req.isEndIndex)
        next()
    } catch (err) {
        next(err)
    }
}
