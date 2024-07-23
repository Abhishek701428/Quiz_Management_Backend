import express from 'express';
import { Router } from 'express';
const router: Router = express.Router();
import * as usersController from './usersController';
import { authenticateSuperAdminAndAdmin, authenticateAndAuthorize } from '../../middleware/authMiddleware'



router.post('/login', usersController.loginAllUsers);

router.get('/getuser', usersController.getUsers)

router.get('/getAll', usersController.getAllUsers)

router.post('/register', authenticateSuperAdminAndAdmin, usersController.registerAllUser)

router.put('/change-password', authenticateAndAuthorize(['user', 'admin', 'superadmin']), usersController.changePassword);
export default router;
