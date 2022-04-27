import { Request } from 'express';
import Category, { CategoryDocument } from '../models/Category';

export default class CategoryService {
	public async getCategories(): Promise<{ status: string; data: CategoryDocument[] }> {
		const categories = await Category.find().populate('user').sort({ updatedAt: -1 });
		return { status: 'success', data: categories };
	}

	public async getCategoriesList(): Promise<{ status: string; data: CategoryDocument[] }> {
		const categories = await Category.find({ isDeleted: false }, 'name _id');
		return { status: 'success', data: categories };
	}

	public async checkCategoryName(req: Request): Promise<{ status: string; data: boolean }> {
		if (!req.query.name) {
			throw new Error('Name Is required');
		}
		const regex = new RegExp(`^${req.query.name}$`, 'i');
		const count = await Category.countDocuments({ name: regex, isDeleted: false });
		if (count > 0) {
			return { status: 'success', data: true };
		}
		return { status: 'success', data: false };
	}

	public async createCategory(req: Request): Promise<{ status: string; data: CategoryDocument }> {
		const { name } = req.body;
		const user = req._id;
		if (!name) {
			throw new Error('Name is required for creating category');
		}
		const category = new Category({
			name,
			user,
			isDeleted: false,
		});
		await category.save();
		return { status: 'success', data: category };
	}

	public async editCategory(
		req: Request,
	): Promise<{ status: string; data: CategoryDocument | null }> {
		const { name } = req.body;
		const id = req.params.id;
		const category = await Category.findByIdAndUpdate(id, { name }, { new: true });
		return { status: 'success', data: category };
	}

	public async deleteCategory(
		req: Request,
	): Promise<{ status: string; data: CategoryDocument | null }> {
		const id = req.params.id;
		const category = await Category.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
		return { status: 'success', data: category };
	}
}
