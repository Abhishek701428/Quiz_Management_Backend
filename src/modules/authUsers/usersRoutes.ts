import express from 'express';
import { Router } from 'express';
const router: Router = express.Router();
import * as usersController from './usersController';
import {authenticateSuperAdminAndAdmin} from '../../middleware/authMiddleware'



router.post('/login', usersController.loginAllUsers);

router.post('/register',authenticateSuperAdminAndAdmin,usersController.registerAllUser)

export default router;
