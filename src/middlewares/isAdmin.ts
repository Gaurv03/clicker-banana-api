import { Request, Response, NextFunction } from "express";
import { statusCodes } from '../helpers';
const statusCode = new statusCodes();
interface CustomRequest extends Request {
    user?: {
        role: string,
    };
}

export const isAdmin = (req: CustomRequest, res: Response, next: NextFunction) => {
    try {

        if (req.user?.role === "admin") {
            return next();
        }
        return statusCode.forbidden(res, "Admin access required")
    } catch (error) {
        return statusCode.internalServerError(res, (error as Error).message || "Internal server error")
    }
};