import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';
import ErrorResponse from '../utils/errorResponse';
const util  = require('node:util');
require('dotenv').config();
const validateReq = async (req: Request, res: Response, next: NextFunction) => {
  const options = {
    name: { min: 4, max: 100 },
  };

  try {
    await check('name', util.format(process.env.ERROR_NAME, options.name.min, options.name.max))
      .isLength({ min: options.name.min, max: options.name.max })
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
