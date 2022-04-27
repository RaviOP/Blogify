import { Schema, model, Document, Model } from 'mongoose';

interface IArticle {
	heading: string;
	description: string|null;
	content: string | null;
	thumbnail: string;
	isDeleted: boolean;
}

export interface ArticleDocument extends IArticle, Document {
	category: Schema.Types.ObjectId[];
	user: Schema.Types.ObjectId;
}

interface ArticleModel extends Model<ArticleDocument> {}

const articleSchema = new Schema<ArticleDocument, ArticleModel>(
	{
		heading: {
			type: String,
			required: true,
		},
		description: {
            type: String,
            default: null
		},
		content: {
            type: String,
            default: null
		},
		thumbnail: {
			type: String,
			required: true,
		},
		category: [{
			type: Schema.Types.ObjectId,
			ref: 'Category',
			required: true,
		}],
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

const Article = model<ArticleDocument, ArticleModel>('Article', articleSchema);
export default Article;
