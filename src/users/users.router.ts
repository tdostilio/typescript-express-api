/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from 'express'
import * as UserService from './user.service'
// import { BaseUser } from './user.interface'

/**
 * Router Definition
 */

export const usersRouter = express.Router()

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
