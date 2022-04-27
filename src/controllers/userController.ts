import { Request, Response } from 'express';
import UserService from '../services/userService';

export default class UserController {
	private _userService: UserService;
	constructor() {
		this._userService = new UserService();
	}

	getAllUsers = async (req: Request, res: Response) => {
		try {
			const result = await this._userService.getAllUsers(req);
			return res.status(200).send(result);
		} catch (error: any) {
			return res.send({ status: 'error', message: error.message });
		}
	};

	registerUser = async (req: Request, res: Response) => {
		try {
			const result = await this._userService.registerUser(req);
			return res.status(201).send(result);
		} catch (error: any) {
			return res.status(400).send({ status: 'error', message: error.message });
		}
	};

	activateUser = async (req: Request, res: Response) => {
		try {
			const result = await this._userService.activateUser(req);
			return res.status(200).send(result);
		} catch (error: any) {
			return res.status(400).send({ status: 'error', message: error.message });
		}
	};

	getInactiveUser = async (req: Request, res: Response) => {
		try {
			const result = await this._userService.getInactiveUser(req);
			return res.status(200).send(result);
		} catch (error: any) {
			return res.status(400).send({ status: 'error', message: error.message });
		}
	};

	loginUser = async (req: Request, res: Response) => {
		try {
			const result = await this._userService.loginUser(req);
			return res.status(200).send(result);
		} catch (error: any) {
			return res.status(400).send({ status: 'error', message: error.message });
		}
	};

	getCurrentUser = async (req: Request, res: Response) => {
		try {
			const result = await this._userService.getCurrentUser(req);
			return res.status(200).send(result);
		} catch (error: any) {
			return res.status(400).send({ status: 'error', message: error.message });
		}
	};

	checkIfEmailUsed = async (req: Request, res: Response) => {
		try {
			const result = await this._userService.checkIfEmailUsed(req);
			return res.status(200).send(result);
		} catch (error: any) {
			return res.status(400).send({ status: 'error', message: error.message });
		}
	};

	checkIfUsernameUsed = async (req: Request, res: Response) => {
		try {
			const result = await this._userService.checkIfUsernameUsed(req);
			return res.status(200).send(result);
		} catch (error: any) {
			return res.status(400).send({ status: 'error', message: error.message });
		}
	};

	updateCurrentUser = async (req: Request, res: Response) => {
		try {
			const result = await this._userService.updateCurrentUser(req);
			return res.status(200).send(result);
		} catch (error: any) {
			return res.status(400).send({ status: 'error', message: error.message });
		}
	};

	deleteCurrentUser = async (req: Request, res: Response) => {
		try {
			const result = await this._userService.deleteCurrentUser(req);
			return res.status(200).send(result);
		} catch (error: any) {
			return res.status(400).send({ status: 'error', message: error.message });
		}
	};

	getUserById = async (req: Request, res: Response) => {
		try {
			const result = await this._userService.getUserById(req);
			return res.status(200).send(result);
		} catch (error: any) {
			return res.status(400).send({ status: 'error', message: error.message });
		}
	};

	updateUserById = async (req: Request, res: Response) => {
		try {
			const result = await this._userService.updateUserById(req);
			return res.status(200).send(result);
		} catch (error: any) {
			return res.status(400).send({ status: 'error', message: error.message });
		}
	};

	deleteUserById = async (req: Request, res: Response) => {
		try {
			const result = await this._userService.deleteUserById(req);
			return res.status(200).send(result);
		} catch (error: any) {
			return res.status(400).send({ status: 'error', message: error.message });
		}
	};

	updatePassowrd = async (req: Request, res: Response) => {
		try {
			const result = await this._userService.updatePassword(req);
			return res.status(200).send(result);
		} catch (error: any) {
			return res.status(400).send({ status: 'error', message: error.message });
		}
	};
}
