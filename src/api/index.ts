import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import itemsRouter from './routes/itemRouter'
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
app.use(verifySession)
app.use('/api/menu/items', itemsRouter)
app.use('/api/pet', petRouter)

// must mount the error handler(s) after the router
app.use(errorHandler)
app.use(notFoundHandler)

export default app
