import jwt from 'jsonwebtoken';
import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt"
import { ApiResponse } from '../utils/ApiResponse';

export const Register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body; 
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(409).json("User already exist");
        }
        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        // save to database
        const newUser = await User.create({ name, email, password: hashPassword });
        return res.json(new ApiResponse(201, newUser, "Register successful"));
    } catch (error) {
        console.log(error)
        return res.status(500).json("Internal server error");
    }
}

export const Login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json("email not found");
        }
        const isCorrect = await bcrypt.compare(password, user.password);
        if (!isCorrect) {
            return res.status(404).json("Incorrect password");
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!);
        return res.status(201).json(new ApiResponse(201, { user, token }, "login successful"));
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal server error")
    }
}

export const forgetPassword = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const userExists = await User.findOne({ email });
        if (!userExists) {
            return res.status(401).json("User not exist");
        }
        const hashPassword = await bcrypt.hash(password, 10);
        await User.findByIdAndUpdate(userExists._id, { password: hashPassword }, { new: true });
        const token = jwt.sign({ userId: userExists._id }, process.env.JWT_SECRET!);
        return res.json(new ApiResponse(201, token, "login successful"));
    } catch (error) {
        return res.status(500).json("Internal server error");
    }

}

