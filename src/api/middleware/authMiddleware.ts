import { Request, Response, NextFunction } from 'express'
import * as admin from 'firebase-admin'

interface CustomRequest extends Request {
  user?: any // Replace 'any' with the appropriate type for your user object
}

// Initialize the Firebase Admin SDK with your service account credentials
const serviceAccount = require('../../../firebase-service-account-key.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

// Middleware to verify Firebase session
export const verifySession = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    // Verify the ID token using the Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(token)
    req.user = decodedToken // Set the authenticated user in the request object

    next()
  } catch (error) {
    console.error('Error verifying Firebase session:', error)
    return res.status(401).json({ message: 'Unauthorized' })
  }
}
