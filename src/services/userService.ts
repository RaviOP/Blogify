import { Request } from 'express';
import { SendMailOptions } from 'nodemailer';
import User from '../models/User';
import transporter from '../utility/nodemailer';

export default class UserService {
	async getAllUsers(req: Request) {
		const users = await User.find({}).sort({ updatedAt: -1 });
		return { status: 'success', data: users };
	}

	async registerUser(req: Request) {
		const { username, email, password, birthday, country } = req.body;
		if (!username) {
			throw new Error('Username is required');
		}
		if (!email) {
			throw new Error('Email is required');
		}
		if (!password) {
			throw new Error('Password is required');
		}
		const isEmailUsed = await User.isEmailUsed(email);
		if (isEmailUsed) {
			throw new Error('User already exists');
		}
		const isUsernameUsed = await User.isUsernameUsed(username);
		if (isUsernameUsed) {
			throw new Error('User already exists');
		}
		const profile = req.file ? `${req.file.path}` : null;
		const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		let securityCode = '';
		for (let i = 0; i <= 10; i++) {
			securityCode += characters[Math.floor(Math.random() * characters.length)];
		}
		const user = new User({
			username,
			email,
			password,
			isAdmin: false,
			profile,
			isDeleted: false,
			birthday: birthday || '',
			securityCode,
			country,
		});
		const mailOptions: SendMailOptions = {
			from: process.env.EMAIL,
			to: email,
			date: new Date().toUTCString(),
			subject: 'Please Confirm Your Account',
			html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <b style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Blogify</b>
    </div>
    <p style="font-size:1.1em">Hi, ${email}</p>
    <p>Thank you for choosing Blogify. Use the following Security Code to complete your Registration</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${securityCode}</h2>
    <a href=${`http://localhost:3000/confirm/${user._id.toString()}`} target='_blank'>Click Here to Enter Security Code</a>
    <p style="font-size:0.9em;">Regards,<br /><b>Blogify</b></p>
    <hr style="border:none;border-top:1px solid #eee" />
  </div>
</div>`,
		};
		await user.save();
		transporter.sendMail(mailOptions, (err, info) => {
			if (err) {
				console.log(err);
			}
			console.log(info);
		});
		return { status: 'success', data: { user } };
	}

	async activateUser(req: Request) {
		const { securityCode, userId } = req.body;
		if (!securityCode) {
			throw new Error('Security code is required');
		}
		const user = await User.findById(userId);
		if (!user) {
			throw new Error('User Not Found');
		}
		if (user.securityCode === securityCode) {
			user.isActive = true;
			await user.save();
			const token = await user.generateAuthToken();
			return { status: 'success', data: { user, token } };
		} else {
			throw new Error('Invalid Security Code');
		}
	}

	async loginUser(req: Request) {
		const { username, password } = req.body;
		if (!username) {
			throw new Error('username or email is required');
		}
		if (!password) {
			throw new Error('password is required');
		}
		const user = await User.findByCredentials(username, password);
		const token = await user.generateAuthToken();
		return { status: 'success', data: { user, token } };
	}

	async getInactiveUser(req: Request) {
		const id = req.params.id;
		if (!id) {
			throw new Error('Id is required');
		}
		const user = await User.findOne({
			_id: id,
			isActive: false,
			isDeleted: false,
		});
		if (!user) {
			throw new Error('User Not found');
		}
		return { status: 'success', data: user };
	}

	async getCurrentUser(req: Request) {
		const user = await User.findById(req._id).populate('interested');
		return { status: 'success', data: user };
	}

	async checkIfEmailUsed(req: Request) {
		const email = req.query.email;
		if (!email) {
			throw new Error('Email is required');
		}
		const result = await User.isEmailUsed(String(email));
		return { status: 'success', data: result };
	}

	async checkIfUsernameUsed(req: Request) {
		const username = req.query.username;
		if (!username) {
			throw new Error('Username is required');
		}
		const result = await User.isUsernameUsed(String(username));
		return { status: 'success', data: result };
	}

	async updateCurrentUser(req: Request) {
		const { username, birthday, country, interested } = req.body;
		const user = await User.findOne({ _id: req._id });
		if (!user) {
			throw new Error('User Not Found');
		}
		user.username = username || user.username;
		user.birthday = birthday || user.birthday;
		user.country = country || user.country;
		user.interested = [...interested];
		await user.save();
		const token = await user.generateAuthToken();
		return { status: 'success', data: { user, token } };
	}

	async deleteCurrentUser(req: Request) {
		const id = req._id;
		const user = await User.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
		if (!user) {
			throw new Error('User Not Found');
		}
		return { status: 'success', data: user };
	}

	async getUserById(req: Request) {
		const id = req.params.id;
		const user = await User.findById(id).populate('interested');
		if (!user) {
			throw new Error('User Not Found');
		}
		return { status: 'success', data: user };
	}

	async updateUserById(req: Request) {
		const id = req.params.id;
		const { isActive, isAdmin } = req.body;
		const user = await User.findByIdAndUpdate(id, { isActive, isAdmin }, { new: true });
		if (!user) {
			throw new Error('User Not Found');
		}
		return { status: 'success', data: user };
	}

	async deleteUserById(req: Request) {
		const id = req.params.id;
		const user = await User.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
		if (!user) {
			throw new Error('User Not Found');
		}
		return { status: 'success', data: user };
	}

	async updatePassword(req: Request) {
		const { password, newPassword } = req.body;
		const user = await User.findById(req._id);
		if (!user) {
			throw new Error('User Not Found')
		}
		const oldPasswordMatch = await user?.checkPassword(password);
		if (!oldPasswordMatch) {
			throw new Error('Incorrect Old Password');
		} else {
			user.password = newPassword;
			await user.save();
			return {status: 'success',data: user}
		}
	}
}
