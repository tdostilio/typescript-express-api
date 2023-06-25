/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from 'express'
import * as FirebaseClient from '../auth/firebaseClient'

/**
 * Router Definition
 */
const usersRouter = express.Router()

/**
 * Controller Definitions
 */

usersRouter.post('/signUp', async (req: Request, res: Response) => {
  const { email, password } = req.body
  try {
    const newUser = await FirebaseClient.createUser(email, password)
    res.status(201).send(newUser)
  } catch (e: any) {
    res.status(500).send(e.message)
  }
})

// login
usersRouter.post('/signIn', async (req: Request, res: Response) => {
  const { email, password } = req.body
  try {
    const user = await FirebaseClient.signIn(email, password)
    if (user) {
      return res.status(200).send(user)
    }
    res.status(401).send('Unauthorized')
  } catch (e: any) {
    res.status(500).send(e.message)
  }
})

// this technically doesn't do anything yet because this is client-side auth, but its ok
usersRouter.post('/signOut', async (req: Request, res: Response) => {
  try {
    await FirebaseClient.logOut()
    res.status(201).send('Success')
  } catch (e: any) {
    res.status(500).send(e.message)
  }
})

export default usersRouter
