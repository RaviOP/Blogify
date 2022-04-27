import { Request, Response } from "express";
import ArticleService from "../services/articleService";

export default class ArticleController {
	private articleService: ArticleService;
	constructor() {
		this.articleService = new ArticleService();
	}

	getArticles = async (req: Request, res: Response) => {
		try {
			const result = await this.articleService.getArticles(req);
			return res.status(200).send(result);
		} catch (error: any) {
			return res.status(500).send({ status: 'error', message: error.message });
		}
	};

	createArticle = async (req: Request, res: Response) => {
		try {
			const result = await this.articleService.createArticle(req);
			return res.status(201).send(result);
		} catch (error: any) {
			return res.status(500).send({ status: 'error', message: error.message });
		}
	};
}