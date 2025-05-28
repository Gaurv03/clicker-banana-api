import { ClickCountModel } from "../models/count.model";

class ClickCountService {

    public async countClicks(req: any, res: any): Promise<Object> {
        let countData
        try {
            const { counts } = req.body;
            const { userId } = req.user;

            await ClickCountModel.updateOne(
                { userId },
                { $inc: { counts } },
                { upsert: true }
            );
            countData = await ClickCountModel.findOne({ userId })

        } catch (error) {
            console.log(error)
            throw new Error('Error creating item: ' + error);
        }
        return { countData }
    }

}

export default new ClickCountService();