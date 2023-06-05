import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import UserModel from '../services/user';
import ErrorResponse from '../utils/errorResponse';
require('dotenv').config();

interface CustomRequest extends Request {
  user?: any;
}

export const protect = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  let token = '';
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }
  if (!token) {
    return next(new ErrorResponse(401, 'Vui lòng đăng nhập tài khoản'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as Secret) as { id: string };
    req.user = await UserModel.listItems({ id: decoded.id }, { task: 'one' });
    next();
  } catch (err) {
    return next(new ErrorResponse(401, 'Vui lòng đăng nhập tài khoản'));
  }
};

export const authorize = (...roles: string[]) => {
  return (req: CustomRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new ErrorResponse(403, 'Bạn không có quyền truy cập'));
    }
    next();
  };
};
