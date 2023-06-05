import { Request, Response, NextFunction } from 'express';
import ValidateReq from '../middleware/validateReq';
import ErrorResponse from '../utils/errorResponse'
import MainModel from '../services/product';
import { v2 as cloudinary } from 'cloudinary';

class ProductController {
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
            const fileData: string | Object | any = req.files ? req.files : '';
            req.body.image01 = fileData.image01[0].path;
            req.body.image02 = fileData.image02[0].path;
            req.body.image03 = fileData.image03[0].path;
            if (error) {
                if (fileData) {
                    cloudinary.api.delete_resources([fileData.image[0].filename])
                }
            }
            if (!error) {
                const data = await MainModel.create(req.body);
                res.status(200).json({
                    success: true,
                    data: data
                })
            }
        } catch (error) {
            console.log("🚀 ~ file: productController.ts:50 ~ ProductController ~ addUser ~ error:", error)

        }
    };






    public async put(req: Request, res: Response, next: NextFunction): Promise<any> {
        const err = await ValidateReq.init(req, res, next);
        const fileData: string | Object | any = req.files ? req.files : '';
       
        if (fileData) {
            req.body.image01 = fileData.image01[0].path;
            req.body.image02 = fileData.image02[0].path;
            req.body.image03 = fileData.image03[0].path;
        }

        if (err) {
            if (fileData) {
                cloudinary.api.delete_resources([fileData.image[0].filename])
            }
        }
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

export default new ProductController();