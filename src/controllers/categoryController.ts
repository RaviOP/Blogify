import { Request, Response } from "express";
import CategoryService from "../services/categoryService";

export default class CategoryController {
	private categoryService: CategoryService;

	constructor() {
		this.categoryService = new CategoryService();
	}

	getCategories = async (req: Request, res: Response) => {
		try {
			const result = await this.categoryService.getCategories();
			return res.status(200).send(result);
		} catch (error: any) {
			return res.status(500).send({ status: 'error', message: error.message });
		}
	};

	getCategoriesList = async (req: Request, res: Response) => {
		try {
			const result = await this.categoryService.getCategoriesList();
			return res.status(200).send(result);
		} catch (error: any) {
			return res.status(500).send({ status: 'error', message: error.message });
		}
	};

	createCategory = async (req: Request, res: Response) => {
		try {
			const result = await this.categoryService.createCategory(req);
			return res.status(201).send(result);
		} catch (error: any) {
			return res.status(400).send({ status: 'error', message: error.message });
		}
	};

	checkCategoryName = async (req: Request, res: Response) => {
		try {
			const result = await this.categoryService.checkCategoryName(req);
			return res.status(200).send(result);
		} catch (error: any) {
			return res.status(400).send({ status: 'error', message: error.message });
		}
	};

	editCategory = async (req: Request, res: Response) => {
		try {
			const result = await this.categoryService.editCategory(req);
			return res.status(200).send(result);
		} catch (error: any) {
			return res.status(400).send({ status: 'error', message: error.message });
		}
	};

	deleteCategory = async (req: Request, res: Response) => {
		try {
			const result = await this.categoryService.deleteCategory(req);
			return res.status(200).send(result);
		} catch (error: any) {
			return res.status(400).send({ status: 'error', message: error.message });
		}
	};
}