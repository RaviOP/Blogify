import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination (req, file, cb) {
        cb(null,'uploads/')
    },
    filename(req, file, cb) {
        let name = '';
        if (req.body.username) {
            name = req.body.username.split(' ').join("-");
            
        } else if (req.body.heading) {
            name = req.body.heading.split(' ').join('-');
        }
        cb(null, `${name}-${Date.now()}${path.extname(file.originalname)}`);
    }
})

const checkFileType = (file: Express.Multer.File, cb: any) => {
    const fileTypes = /jpg|jpeg|png/;
	const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
	const mimeType = fileTypes.test(file.mimetype);

	if (extName && mimeType) {
		return cb(null, true);
	} else {
		cb('Images Only');
	}
}

export const upload = multer({
	storage,
	fileFilter(req, file, cb) {
		checkFileType(file, cb);
    },
    limits: {
        fileSize: 3000000 
    }
});