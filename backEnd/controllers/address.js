import asyncErrorWrapper from '../helpers/error/asyncErrorWrapper.js'
import AddressModel from '../models/address.js'
import CustomError from '../helpers/error/CustomError.js'

export const getByUserIdAddress=asyncErrorWrapper(async (req,res,next)=>{
    const addresses=await AddressModel.find({user:req.user._id})
    res.status(200).json({
        success:true,
        message:"User's addresses have been successfully listed",
        addresses
    })
})

export const addAddress = asyncErrorWrapper(async (req, res, next) => {

    req.body.user = req.user._id
    console.log(req.user)
    console.log(req.body)
    const addAddress = await AddressModel.create({...req.body})

    res.status(201).json({
        success: true,
        message: 'Address added successfully',
        addAddress,
    })
})

export const getByIdAddress = asyncErrorWrapper(async (req, res, next) => {
    const address = await AddressModel.findById(req.params.addressId)
    if (!address) return next(new CustomError('Address not found', 404))
    res.status(200).json({
        success: true,
        message: 'The address has been successfully fetched',
        address,
    })
})

export const editAddress = asyncErrorWrapper(async (req, res, next) => {
    console.log(req.params.addressId)
    const editAddress = await AddressModel.findById(req.params.addressId)
    if (!editAddress) return next(new CustomError('Address not found', 404))
    for (const key in req.body) {
        editAddress[key] = req.body[key]
    }
    await editAddress.save()

    res.status(200).json({
        success: true,
        message: 'Address edit successfully',
        editAddress,
    })
})
export const deleteAddress = asyncErrorWrapper(async (req, res, next) => {
    const deleteAddress = await AddressModel.findByIdAndDelete(req.params.addressId)
    if(!deleteAddress)return next(new CustomError("Address not found !",404))
    res.status(200).json({
        success: true,
        message: 'Address was deleted successfully',
    })
})