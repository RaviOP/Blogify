import { Schema, model, Document, Model } from 'mongoose';

interface ICategory {
	name: string;
	isDeleted: boolean;
}

export interface CategoryDocument extends ICategory, Document {
	user: Schema.Types.ObjectId;
}

interface CategoryModel extends Model<CategoryDocument> {}

const categorySchema = new Schema<CategoryDocument, CategoryModel>(
	{
		name: {
			type: String,
			required: true,
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		isDeleted: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	},
);

categorySchema.index({ name: 1 });

const Category = model<CategoryDocument, CategoryModel>('Category', categorySchema);
export default Category;
