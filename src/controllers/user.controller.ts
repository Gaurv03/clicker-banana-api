import { Request, Response } from 'express';
import userService from '../services/user.service';
import { statusCodes } from '../helpers';

const statusCode = new statusCodes();
class UserController {
    public async addUser(req: Request, res: Response) {
        try {
            const data = await userService.addUser(req, res);
            return statusCode.success(res, "Request Acknowledged", data)
        } catch (error: any) {
            console.log(error)
            return statusCode.internalServerError(res, (error as Error).message || "Internal server error")
        }
    }
    public async updateUser(req: Request, res: Response) {
        try {
            const data = await userService.updateUser(req, res);
            return statusCode.success(res, "Request Acknowledged", data)
        } catch (error: any) {
            console.log(error)
            return statusCode.internalServerError(res, (error as Error).message || "Internal server error")
        }
    }
    public async getUsers(req: Request, res: Response) {
        try {
            const data = await userService.getUsers(req, res);
            return statusCode.success(res, "Request Acknowledged", data)
        } catch (error: any) {
            console.log(error)
            return statusCode.internalServerError(res, (error as Error).message || "Internal server error")
        }
    }
    public async deleteUser(req: Request, res: Response) {
        try {
            const data = await userService.deleteUser(req, res);
            return statusCode.success(res, "Request Acknowledged", data)
        } catch (error: any) {
            console.log(error)
            return statusCode.internalServerError(res, (error as Error).message || "Internal server error")

        }
    }
    public async blockUser(req: Request, res: Response) {
        try {
            const data = await userService.blockUser(req, res);
            return statusCode.success(res, "Request Acknowledged", data)
        } catch (error: any) {
            console.log(error)
            return statusCode.internalServerError(res, (error as Error).message || "Internal server error")
        }
    }
    public async unblockUser(req: Request, res: Response) {
        try {
            const data = await userService.unblockUser(req, res);
            return statusCode.success(res, "Request Acknowledged", data)
        } catch (error: any) {
            console.log(error)
            return statusCode.internalServerError(res, (error as Error).message || "Internal server error")
        }
    }

}

export default new UserController();