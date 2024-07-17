import bcrypt from "bcrypt";
import { Request, Response } from "express";
import "dotenv/config";

export const hashPassword = async (req: Request, res: Response) => {
    try {
        const salt = Number(process.env.SALT);
        const hash = await bcrypt.hash(req.body.password, salt);
        req.session.password = hash;
        return hash;
    } catch (err) {
        console.error(err);
        throw err;
    }
}