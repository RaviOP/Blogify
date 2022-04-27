import { UserDocument } from './models/User';

declare global {
	namespace Express {
		interface Request {
			_id: string;
			user: UserDocument;
		}
	}
}

export {}

