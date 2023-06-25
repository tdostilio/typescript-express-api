import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import usersRouter from './routes/userRouter'
import petRouter from './routes/petRouter'
import { errorHandler } from './middleware/error.middleware'
import { notFoundHandler } from './middleware/not-found.middleware'
import { verifySession } from './middleware/authMiddleware'

const app = express()

/**
 *  App Configuration
 */
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use('/api/users', usersRouter)
// all routes after this will require session
app.use(verifySession)
app.use('/api/pet', petRouter)

// must mount the error handler(s) after the router
app.use(errorHandler)
app.use(notFoundHandler)

export default app
