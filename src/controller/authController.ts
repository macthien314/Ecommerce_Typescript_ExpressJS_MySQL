import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth';
import ValidateReq from '../middleware/validateReq';
require("dotenv").config();
class AuthController {

    public async login(req: Request, res: Response, next: NextFunction): Promise<any> {
      let error = await ValidateReq.init(req, res, next);
     try {
        if (!error) {
          const response = await authService.loginService(req.body);
            if (response) {
            saveCookieResponse(res, 201, response);

          //   res.status(200).json(response);
          }
        }
      } catch (err) {
        return res.status(500).json({
          msg: err
        });
      }
    };  
    public async register (req: Request, res: Response, next: NextFunction): Promise<any> {
        let error = await ValidateReq.init(req, res, next);
        try {
          if (!error) {
            const response = await authService.registerService(req.body);      
            if (response) {
              saveCookieResponse(res, 201, response.token);
              // res.status(200).json(response);
            }
          }
        } catch (err) {
          console.log("🚀 ~ file: authController.ts:38 ~ AuthController ~ register ~ err:", err)
          return res.status(500).json({
            msg: err
          });
        }
       
    }
 
      

    public async logout (req: Request, res: Response, next: NextFunction): Promise<any> {
        res.status(200)
        .cookie('token', 'none', {
          expires: new Date(Date.now() + 10 * 1000),
          httpOnly: true
        })
        .json({
          success: true
        });
    }

  

    public async me (req: Request, res: Response, next: NextFunction): Promise<any> {
      try {
        res.status(200).json({
          success: true,
          user: (req as any).user
        });
      } catch (err) {
        next(err);
      }
    }

    

}

export default new AuthController();  

const saveCookieResponse = (res: Response, statusCode: number, data: string | any): any => {
  const options = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true
  };
  res.status(statusCode)
    .cookie('token', data.token, options)
    .json({
      success: true,
      data
    });
};  