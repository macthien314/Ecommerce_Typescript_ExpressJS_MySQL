import { Request, Response, NextFunction } from 'express';
import ValidateReq from '../middleware/validateReq';
import MainModel from '../services/category';

class CategoryController {
    public async get(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {

            let data = await MainModel.listItems(req.query, { 'task': 'all' });
            let count = Array.isArray(data) ? data.length : 0;
            res.status(200).json({
                success: true,
                count,
                data
            })
        } catch (error) {
            console.log(" error:", error)
            
        }
       
    }

    public async getOne(req: Request, res: Response, next: NextFunction): Promise<any> {
        let data = await MainModel.listItems({ id: req.params.id }, { 'task': 'one' })
        res.status(200).json({
            success: true,
            data
        })
    }
 
    public async post(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const error = await ValidateReq.init(req, res, next);  
            if (!error) {
              const data = await MainModel.create(req.body);
              res.status(200).json({
                success: true,
                data: data
              })
            }
        } catch (error) {
            console.log("🚀 ~ file: categoryController.ts:51 ~ CategoryController ~ post ~ error:", error)
            
        }
      };

    public async put(req: Request, res: Response, next: NextFunction): Promise<any> {
        const err = await ValidateReq.init(req, res, next);     
        if (!err) {
            let data = await MainModel.editItem({ 'id': req.params.id, 'body': req.body }, { 'task': 'edit' })
            res.status(200).json({
                success: true,
                data
            })
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction): Promise<any> {
        let data = await MainModel.deleteItem({ 'id': req.params.id }, { 'task': 'one' })
        res.status(200).json({
            success: true,
            data
        })
    }

}

export default new CategoryController();