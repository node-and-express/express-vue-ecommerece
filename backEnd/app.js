import dotenv from 'dotenv'
dotenv.config({ path: './config/env/config.env' })
import express from 'express'

import dbConnect from './helpers/database/dbConnect.js'
import cors from 'cors'
import indexRouter from './routes/index.js'
import CustomError from './helpers/error/CustomError.js'
import logger from './config/logger/logger.config.js'
import morgan from 'morgan'
import helmet from 'helmet'


dbConnect()

const app = express()


if (process.env.MODE === 'production') app.use(morgan('dev'))
app.use(helmet())
app.use('/assets', express.static('assets'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/api', indexRouter)

app.use((err, req, res, next) => {
    let customError =err;
    console.log(err)
    switch (err.name) {
        case 'SyntaxError':
            customError = new CustomError(err.message, 400)
            break
        case 'ValidationError':
            customError = new CustomError(err.message, 400)
            break
    }

    res.status(customError.status || 500).json({
        success: false,
        message: customError.message,
    })
    if (process.env.MODE === 'production') logger.error(customError)
})

export default app
