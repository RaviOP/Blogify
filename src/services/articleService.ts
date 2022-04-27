import { Request } from 'express';
import Article, { ArticleDocument } from '../models/Article';

export default class ArticleService {
    async getArticles(req: Request): Promise<{ status: string; data: ArticleDocument[] }> {
        const keyword = req.query.keyword;
        let query: any = {
            $and: [
                {isDeleted: false}
            ]
        }
        if (keyword) {
            query.$and.push({heading: {$regex: keyword}})
        }
        const articles = await Article.find(query).sort({ createdAt: -1 }).populate('user');
        return { status: 'success', data: articles };
    }

	async createArticle(req: Request): Promise<{ status: string; data: ArticleDocument }> {
		const thumbnail = req.file ? `${req.file.path}` : null;
		const { heading, description, content, category } = req.body;
		const article = new Article({
			heading,
			description,
			content,
			category,
			thumbnail,
			user: req._id,
			isDeleted: false,
		});
		await article.save();
		return { status: 'success', data: article };
	}
}
