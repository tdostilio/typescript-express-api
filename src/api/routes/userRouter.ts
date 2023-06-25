/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from 'express'
import * as UserService from '../../users/user.service'
// import { BaseUser } from './user.interface'

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
    const newUser = await UserService.createUser(email, password)
    res.status(201).send(newUser)
  } catch (e: any) {
    res.status(500).send(e.message)
  }
})

// login
usersRouter.post('/signIn', async (req: Request, res: Response) => {
  const { email, password } = req.body
  try {
    const user = await UserService.signIn(email, password)
    if (user) {
      res.status(201).send(user)
    }
    res.status(401).send('Unauthorized')
  } catch (e: any) {
    res.status(500).send(e.message)
  }
})

usersRouter.post('/signOut', async (req: Request, res: Response) => {
  try {
    await UserService.logOut()
    res.status(201).send('Success')
  } catch (e: any) {
    res.status(500).send(e.message)
  }
})

export default usersRouter
