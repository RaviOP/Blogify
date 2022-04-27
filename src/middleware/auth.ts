import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserDocument } from '../models/User';

declare module 'jsonwebtoken' {
	interface JwtPayload {
        _id: string;
        user: UserDocument
	}
}

const auth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ','');
        if (!token) {
            throw new Error('Token not present')
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (typeof decoded == "object") {
            req.user = decoded.user
            req._id = decoded._id
        }
        next()
    } catch (error: any) {
        return res.status(401).send({status: 'error',message: error.message})
    }
}

export default auth