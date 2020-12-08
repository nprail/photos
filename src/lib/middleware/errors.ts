import { NextFunction, Request, Response } from 'express'
import { config } from '../../config/config'

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = {
    name: err.name ? err.name : 'InternalError',
    code: 500,
    message: err.message ? err.message : 'Internal Server Error',
    stack:
      config.environment === 'development' && err.stack ? err.stack : undefined,
  }

  if (error.name === 'CastError') {
    error.code = 400
    error.message = 'Bad request - invalid id'
  } else if (error.name === 'UnauthorizedError') {
    error.code = 401
  }

  console.error(err)

  return res.status(error.code).json(error)
}
