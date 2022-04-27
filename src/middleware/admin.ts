import { NextFunction, Request, Response } from 'express';

const admin = (req: Request, res: Response, next: NextFunction) => {
	if (req.user && req.user.isAdmin) {
		return next();
	}
	return res.status(401).send({ status: 'error', message: 'Not Authorized as Admin' });
};

export default admin;
