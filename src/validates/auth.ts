import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';
import ErrorResponse from '../utils/errorResponse';
const util  = require('node:util');

const validateReq = async (req: Request, res: Response, next: NextFunction) => {
  const options = {
    username: { min: 6, max: 100 },
    password: { min: 4, max: 20 },
  };

  try {
    await check('username', util.format(process.env.ERROR_NAME, options.username.min, options.username.max))
      .isLength({ min: options.username.min, max: options.username.max })
      .run(req);

    await check('email', util.format(process.env.ERROR_EMAIL))
      .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
      .run(req);

    await check('password', util.format(process.env.ERROR_PASSWORD, options.password.min, options.password.max))
      .isLength({ min: options.password.min, max: options.password.max })
      .run(req);

    const errors = validationResult(req);
    const errorMessages = errors.array().map((error) => error.msg);
    if (!errors.isEmpty()) {
      throw new ErrorResponse(400, errorMessages);
    }
    next();
  } catch (err) {
    next(err);
  }
};

export default validateReq;
