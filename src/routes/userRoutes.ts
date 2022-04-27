import { Router } from 'express'
import UserController from '../controllers/userController';
import admin from '../middleware/admin';
import auth from '../middleware/auth';
import { upload } from '../middleware/multer';

const router = Router();
const userController = new UserController()

/* List Of API's available on Users Collection*/

/**
 * @GET - /api/users
 * @description This API returns list of active users in platform
 */
router.get('/api/users', auth, admin, userController.getAllUsers)

/**
 * @POST - /api/users
 * @description This API creates a new User
 */
router.post('/api/users', upload.single('image'), userController.registerUser)

/**
 * @POST - /api/users
 * @description This API creates a new User
 */
router.post('/api/users/activate', userController.activateUser)

/**
 * @GET - /api/users/inactive/:id
 * @description This API checks if user is there in db and is in inactive state
 */
router.get('/api/users/inactive/:id', userController.getInactiveUser)

/**
 * @POST - /api/users/login
 * @description This API is used for login for existing user
 */
router.post('/api/users/login', userController.loginUser)

/**
 * @GET - /api/users/email
 * @description This Api Checks if email is used
 */
router.get('/api/users/email',userController.checkIfEmailUsed)

/**
 * @GET - /api/users/username
 * @description This Api Checks if username is used
 */
router.get('/api/users/username',userController.checkIfUsernameUsed)

/**
 * @GET - /api/users/profile
 * @description This API returns logged in users details
 */
router.get('/api/users/profile',auth, userController.getCurrentUser)

/**
 * @PUT - /api/users/profile
 * @description This API updates logged in users details
 */
router.put('/api/users/profile', auth, userController.updateCurrentUser)

/**
 * @DELETE - /api/users/profile
 * @description This API deletes logged in users details
 */
router.delete('/api/users/profile', auth, userController.deleteCurrentUser)

/**
 * @PUT - /api/users/profile/password
 * @description This API updates logged in users password
 */
router.put('/api/users/profile/password', auth, userController.updatePassowrd)

/**
 * @GET - /api/users/:id
 * @description This API returns details of user by id
 */
router.get('/api/users/:id',auth,admin, userController.getUserById)

/**
 * @PUT - /api/users/:id
 * @description This API updates details of user by id
 */
router.put('/api/users/:id', auth,admin, userController.updateUserById)

/**
 * @DELETE - /api/users/:id
 * @description This API deletes user by id
 */
router.delete('/api/users/:id', auth,admin, userController.deleteUserById)

export {router as userRoutes}