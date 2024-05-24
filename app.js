import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'
import ApplicationRoute from './routes/ApplicationRoute.js'
import JobRoute from './routes/JobRoute.js'
import UserRoute from './routes/UserRoute.js'
import { dbconnection } from './Database/dbConnection.js'
import { ErrorMiddleware } from './Middleware/error.js'

const app = express()


dotenv.config({ path: './Config/config.env' })

// app.use(cors({
//     origin: [process.env.FRONTEND_URL],
//     methods: ['GET', 'POST', 'DELETE', 'PUT'],
//     credentials: true,
// }))

app.use(cors());

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/'
    })
)

app.use('/api/v1/user', UserRoute)
app.use('/api/v1/application', ApplicationRoute)
app.use('/api/v1/job', JobRoute)


dbconnection();
app.use(ErrorMiddleware)


export default app