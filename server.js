import dotenv from 'dotenv'
import express from 'express'
import {connectDB} from './config/dbConn.js'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.route.js'
import bloodReqRouter from './routes/reqBlood.route.js'
import donorRouter from './routes/donor.route.js'
import { verifyJWT } from './middleware/auth.middleware.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cookieParser())

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/request',verifyJWT,bloodReqRouter)
app.use('/api/v1/donate',verifyJWT,donorRouter)

app.listen(PORT, ()=>{
    console.log(`server running on PORT ${PORT}`)
    connectDB()
})