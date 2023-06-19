import HttpException from "../common/http-exception";
import { Request, Response, NextFunction } from "express";

// https://expressjs.com/en/guide/using-middleware.html#middleware.error-handling
export const errorHandler = (
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const status = error.statusCode || error.status || 500

  response.status(status).send(error)
}