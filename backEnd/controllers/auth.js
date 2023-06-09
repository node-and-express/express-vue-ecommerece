import UserModel from '../models/user.js'
import jwt from 'jsonwebtoken'
import CustomError from '../helpers/error/CustomError.js'
import bcrypt from "bcryptjs"

export const register = async (req, res, next) => {
    try {
        await UserModel.create({...req.body})
        res.status(201).json({
            success: true,
            message: `"${req.body.email}" You can login using your e-mail account.`,
        })
    } catch (err) {
        next(err)
    }
}
export const login = async (req, res, next) => {
    const { email, password } = { ...req.body }
    const user = await UserModel.findOne({ email }).select('+password')
     console.log(user)
    if (!user) return next(new CustomError('Email is incorrect', 400))
    bcrypt.compare(password, user.password, (err, res) => {
        if(res===false)
            return next(new CustomError('Password is incorrect.', 400))
    })

    user.password = null
    const token = await jwt.sign({ user }, process.env.jwtSecretKey, {
        expiresIn: process.env.jwtExpire,
    })
    res.status(200).json({
        success: true,
        user,
        token,
    })
}

export const profileUser = async (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user,
    })
}
