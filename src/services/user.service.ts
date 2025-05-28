import bcrypt from 'bcrypt';
import { UserModel } from "../models/user.model";
import { statusCodes } from '../helpers';
var jwt = require('jsonwebtoken');

const statusCode = new statusCodes();
class UserService {

    public async addUser(req: any, res: any): Promise<Object> {
        let userData
        try {
            const { firstName, lastName, password, email, userName } = req.body;


            // Checking if user with same email exists
            let checkEmail = await UserModel.findOne({ email });
            if (checkEmail) {
                return statusCode.badRequest(res, "User already exist")
            }


            // Checking if user with same username exists
            let checkUsername = await UserModel.findOne({ userName });
            if (checkUsername) {
                return statusCode.badRequest(res, "Username already taken")
            }

            // Hashing the password
            const hashedPassword = await bcrypt.hash(password, 10);

            userData = await UserModel.create({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                userName
            })

        } catch (error) {
            console.log(error)
            throw new Error('Error creating item: ' + error);
        }
        return { userData }
    }

    public async updateUser(req: any, res: any): Promise<Object> {
        let userData
        try {
            const { firstName, lastName, email, userName } = req.body;
            const { id } = req.params


            // Checking if user exists
            let userCheck = await UserModel.findOne({ _id: id });
            if (!userCheck) {
                return statusCode.notFound(res, "User not found")
            }

            userData = await UserModel.updateOne(
                { _id: id },
                {
                    $set:
                    {
                        firstName,
                        lastName,
                        email,
                        userName
                    }
                })

        } catch (error) {
            console.log(error)
            throw new Error('Error creating item: ' + error);
        }
        return { userData }
    }

    public async getUsers(req: any, res: any): Promise<Object> {
        let userData, totalCount
        try {

            const { page = '1', limit = '10', email, userName } = req.query;
            const pageNumber = parseInt(page as string, 10);
            const pageSize = parseInt(limit as string, 10);

            // Adding email and userName filter to query
            const filters: Record<string, any> = {
                role: "player",
                isDeleted: false,
            };
            if (email || userName) {
                filters.$or = [];

                if (email) {
                    filters.$or.push({ email: { $regex: email, $options: 'i' } });
                }

                if (userName) {
                    filters.$or.push({ userName: { $regex: userName, $options: 'i' } });
                }
            }

            totalCount = await UserModel.find(filters).countDocuments()

            userData = await UserModel.find(filters)
                .skip((pageNumber - 1) * pageSize)
                .limit(pageSize);

            // Checking if users exists or not
            if (!userData) return statusCode.notFound(res, "Users not found")
        } catch (error) {
            console.log(error)
            throw new Error('Error creating item: ' + error);
        }
        return { userData, totalCount }
    }

    public async deleteUser(req: any, res: any): Promise<Object> {
        let userData
        try {

            const { id } = req.params

            // Checking if user exists
            let userCheck = await UserModel.findOne({ _id: id });
            if (!userCheck) {
                return statusCode.notFound(res, "User not found")
            }

            console.log(id)

            userData = await UserModel.updateOne(
                { _id: id },
                {
                    $set:
                    {
                        isDeleted: true
                    }
                })

        } catch (error) {
            console.log(error)
            throw new Error('Error creating item: ' + error);
        }
        return { userData }
    }

    public async blockUser(req: any, res: any): Promise<Object> {
        let userData
        try {

            const { id } = req.params

            // Checking if user exists
            let userCheck = await UserModel.findOne({ _id: id });
            if (!userCheck) {
                return statusCode.notFound(res, "User not found")
            }

            userData = await UserModel.updateOne(
                { _id: id },
                {
                    $set:
                    {
                        isBlocked: true
                    }
                })

        } catch (error) {
            console.log(error)
            throw new Error('Error creating item: ' + error);
        }
        return { userData: "User Blocked" }
    }
    public async unblockUser(req: any, res: any): Promise<Object> {
        let userData
        try {

            const { id } = req.params

            // Checking if user exists
            let userCheck = await UserModel.findOne({ _id: id });
            if (!userCheck) {
                return statusCode.notFound(res, "User not found")
            }

            userData = await UserModel.updateOne(
                { _id: id },
                {
                    $set:
                    {
                        isBlocked: false
                    }
                })

        } catch (error) {
            console.log(error)
            throw new Error('Error creating item: ' + error);
        }
        return { userData: "User Unblocked" }
    }
}

export default new UserService();