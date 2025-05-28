import { Request, Response } from 'express';
import authService from '../services/auth.service';
import { statusCodes } from '../helpers';

const statusCode = new statusCodes();
class AuthController {
    public async register(req: Request, res: Response) {
        try {
            const data = await authService.register(req, res);
            return statusCode.success(res, "Request Acknowledged", data)
        } catch (error: any) {
            console.log(error)
            return statusCode.internalServerError(res, (error as Error).message || "Internal server error")
        }
    }
    public async login(req: Request, res: Response) {
        try {
            const data = await authService.login(req, res);
            return statusCode.success(res, "Request Acknowledged", data)
        } catch (error: any) {
            console.log(error)
            return statusCode.internalServerError(res, (error as Error).message || "Internal server error")
        }
    }
    public async logout(req: Request, res: Response) {
        try {
            const data = await authService.logout(req, res);
            return statusCode.success(res, "Request Acknowledged", data)
        } catch (error: any) {
            console.log(error)
            return statusCode.internalServerError(res, (error as Error).message || "Internal server error")
        }
    }

}

export default new AuthController();