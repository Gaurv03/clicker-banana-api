import { NextFunction, Request, Response } from 'express';
import { statusCodes } from '../helpers';
var jwt = require('jsonwebtoken');

interface CustomRequest extends Request {
    user?: object;
}

const statusCode = new statusCodes();

const isAuth = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return statusCode.unauthorized(res)
        }
        const decode = await jwt.verify(token, process.env.JWT_SECRET)
        if (!decode) {
            return statusCode.unauthorized(res, "Invalid Token")
        }
        req.user = decode
        next();
    } catch (error) {
        console.log(error)
        return statusCode.internalServerError(res, (error as Error).message || "Internal server error")

    }
}

export default isAuth
