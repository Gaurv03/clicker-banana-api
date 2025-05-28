import mongoose from "mongoose";
import { ClickCountType } from "../utils/types";

const clickCountModel = new mongoose.Schema<ClickCountType>({

    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    counts: { type: Number, default: 0 },
}, { timestamps: true })


export const ClickCountModel = mongoose.model("ClickCount", clickCountModel)