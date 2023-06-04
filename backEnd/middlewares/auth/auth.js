import jwt from 'jsonwebtoken'
import UserModel from "../../models/user.js"
import CustomError from '../../helpers/error/CustomError.js'
import { contentToken, headersCheckToken } from '../../helpers/auth/token.js'

export const isLogin = async (req, res, next) => {
    try {
        if (!headersCheckToken(req))
            return next(
                new CustomError(
                    'You are not authorized to access this route !',
                    401
                )
            )
        const token = contentToken(req)
        const verifiedToken = await jwt.verify(token, process.env.jwtSecretKey)
        req.user = await UserModel.findById(verifiedToken.user._id)
        next()
    } catch (err) {
        next(new CustomError('Invalid token or expired.', 403))
    }
}

export const isAdmin = async (req, res, next) => {
    const user = req.user
    if (user.role !== 'admin')
        return next(
            new CustomError(
                'You are not authorized to access this route !',
                401
            )
        )
    next()
}
