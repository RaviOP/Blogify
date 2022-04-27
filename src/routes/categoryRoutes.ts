import { Router } from 'express';
import CategoryController from '../controllers/categoryController';
import admin from '../middleware/admin';
import auth from '../middleware/auth';

const router = Router();
const categoryController = new CategoryController();

/* List Of API's available on Categories Collection*/

/**
 * @GET - /api/categories
 * @description This API returns list of categories with details in platform
 */
router.get('/api/categories', auth,admin, categoryController.getCategories);

/**
 * @GET - /api/categories/list
 * @description This API returns list of categories in platform
 */
router.get('/api/categories/list', auth, categoryController.getCategoriesList);

/**
 * @GET - /api/categories/name
 * @description This API returns true or false if name is used or not
 */
router.get('/api/categories/name', auth,admin, categoryController.checkCategoryName);

/**
 * @POST - /api/categories
 * @description This API creates a new Category
 */
router.post('/api/categories', auth,admin, categoryController.createCategory);

/**
 * @PUT - /api/categories/:id
 * @description This API edits a Category
 */
router.put('/api/categories/:id', auth, admin, categoryController.editCategory);

/**
 * @DELETE - /api/categories/:id
 * @description This API deletes a Category
 */
router.delete('/api/categories/:id', auth,admin, categoryController.deleteCategory);

export { router as categoryRoutes };
