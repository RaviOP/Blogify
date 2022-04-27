import { Schema, model, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export interface IUser {
	username: string;
	email: string;
	password: string;
	birthday: string|null;
	country: string|null;
	profile: string|null;
	isActive: boolean;
	securityCode: string|null;
	isAdmin: boolean;
	isDeleted: boolean;
}

export interface UserDocument extends IUser, Document {
	generateAuthToken(): string;
	interested: Schema.Types.ObjectId[];
	checkPassword(password: string): boolean;
}

interface UserModel extends Model<UserDocument> {
	findByCredentials(usernameOrEmail: string, password: string): UserDocument;
	isEmailUsed(email: string): boolean;
	isUsernameUsed(username: string): boolean;
}

const userSchema = new Schema<UserDocument, UserModel>(
	{
		username: {
			type: String,
			required: [true, 'Username is required'],
			unique: true,
		},
		email: {
			type: String,
			trim: true,
			required: [true, 'Email is required'],
			unique: true,
			match: [
				/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
				'Please fill a valid email address',
			],
			lowercase: true,
		},
		profile: {
			type: String,
			required: true,
			default: null
		},
		birthday: {
			type: String,
			default: null
		},
		country: {
			type: String,
			default: null
		},
		password: {
			type: String,
			trim: true,
			required: [true, 'Password is required'],
			minlength: [6, 'Minimum length should be 6 Characters'],
		},
		interested: [{
			type: Schema.Types.ObjectId,
			ref: 'Category'
		}],
		isActive: {
			type: Boolean,
			default: false
		},
		securityCode: {
			type: String,
			default: null
		},
		isAdmin: {
			type: Boolean,
			default: false,
			required: true,
		},
		isDeleted: {
			type: Boolean,
			default: false,
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

userSchema.index({ username: 1, email: 1, isActive: 1, isDeleted: 1 });
userSchema.index({ username: 1 });
userSchema.index({ email: 1 });
userSchema.index({ isActive: 1 });
userSchema.index({ isDeleted: 1 });


userSchema.statics.findByCredentials = async (usernameOrEmail: string, password: string) => {
	const user = await User.findOne({
		$or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
		isDeleted: false
	});
	if (!user) {
		throw new Error('Username or Password Incorrect');
	}
	if (user && user.isActive) {
		const isMatched = await bcrypt.compare(password, user.password);
		if (!isMatched) {
			throw new Error('Username or Password Incorrect');
		}
		return user;
		
	} else {
		throw new Error('Please Activate your Account')
	}
};

userSchema.statics.isUsernameUsed = async (username: string) => {
	const count = await User.countDocuments({ username });
	if (count > 0) {
		return true;
	}
	return false;
};


userSchema.statics.isEmailUsed = async (email: string) => {
	const count = await User.countDocuments({ email });
	if (count > 0) {
		return true;
	}
	return false;
};

userSchema.methods.checkPassword = async function (password: string) {
	return bcrypt.compare(password, this.password);
};

userSchema.methods.generateAuthToken = async function () {
	const token = await jwt.sign(
		{
			_id: this._id.toString(),
			user: this,
		},
		process.env.JWT_SECRET,
		{
			expiresIn: '1d'
		}
	);
	return token;
};

userSchema.methods.toJSON = function () {
	const userObject = this.toObject();
	delete userObject.password;
	delete userObject.securityCode;
	return userObject;
};

userSchema.pre('save', async function () {
	if (this.isModified('password')) {
		this.password = await bcrypt.hash(this.password, 10);
	}
});

const User = model<UserDocument, UserModel>('User', userSchema);
export default User;
