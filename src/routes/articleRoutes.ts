import { Router } from 'express';
import ArticleController from '../controllers/articleController';
import auth from '../middleware/auth';
import { upload } from '../middleware/multer';

const router = Router();
const articleController = new ArticleController();

/* List Of API's available on Categories Collection*/

/**
 * @GET - /api/articles
 * @description This API returns list  of articles
 */
router.get('/api/articles', auth, articleController.getArticles);

/**
 * @POST - /api/articles
 * @description This API creates a new Article
 */
router.post('/api/articles', auth,upload.single('image'), articleController.createArticle);


export { router as articleRoutes };
