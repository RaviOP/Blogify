import mongoose from 'mongoose';

export default mongoose
	.connect(process.env.MONGODB_URL)
	.then(() => {
		console.log(`Connected To MongoDB`);
	})
	.catch((error) => {
		console.error(`Error -> ${error.message}`);
	});
