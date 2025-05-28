import mongoose from "mongoose";
import { UserType } from "../utils/types";

const userModel = new mongoose.Schema<UserType>({

    firstName: { type: String, require: true },
    lastName: { type: String, require: true, },
    userName: { type: String, require: true, unique: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    isBlocked: { type: Boolean, require: true, default: false },
    role: { type: String, require: true, enum: ["admin", "player"], default: "player" },
    isDeleted: { type: Boolean, require: true, default: false },

}, { timestamps: true })

export const UserModel = mongoose.model<UserType>("User", userModel)