import { Request, Response } from 'express';
import countService from '../services/count.service';
import { statusCodes } from '../helpers';

const statusCode = new statusCodes();
class CountController {
    public async countClicks(req: Request, res: Response) {
        try {
            const data = await countService.countClicks(req, res);
            return statusCode.success(res, "Request Acknowledged", data)
        } catch (error: any) {
            console.log(error)
            return statusCode.internalServerError(res, (error as Error).message || "Internal server error")
        }
    }

}

export default new CountController();