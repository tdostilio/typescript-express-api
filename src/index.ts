/**
 * Required External Modules
 */

import * as dotenv from 'dotenv'
import app from './api'
import connectDB from './db'

dotenv.config()

/**
 * App Variables
 */
if (!process.env.PORT) {
  process.exit(1)
}
const PORT: number = parseInt(process.env.PORT as string, 10)

/**
 * Server Activation
 */

// Connect to the database
connectDB().then(() => {
  // Start your server or perform other actions
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
  })
})
