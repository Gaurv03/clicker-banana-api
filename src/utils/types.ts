import { ObjectId } from "mongoose"

export type UserType = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    isBlocked: boolean,
    role: "admin" | "player",
    isDeleted: boolean,
    userName: string
}

export type ClickCountType = {
    userId: ObjectId,
    counts: number,
}