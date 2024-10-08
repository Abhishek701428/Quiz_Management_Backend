import { Router } from 'express';
const router = Router();

import * as FileManagerData from '../Customer Data/customerdata-controller';
import { authenticateSuperAdminAndAdmin, authenticateUsers } from '../../../middleware/authMiddleware';
import { authorizeAccess } from '../../../middleware/get.authentication';
import { cloudinaryMiddleware } from '../../../middleware/cloudinaryMiddleware';

router.post('/create', authenticateUsers, authorizeAccess, FileManagerData.createCompany);

router.get('/getAll', cloudinaryMiddleware, authenticateUsers, authorizeAccess, FileManagerData.getAllCompanies);

router.get('/getById/:id', cloudinaryMiddleware, authenticateUsers, authorizeAccess, FileManagerData.getCompanyById);

router.put('/update/:id', authenticateUsers, FileManagerData.updateCompany);

router.delete('/delete/:id', authenticateUsers, FileManagerData.deleteCompany);

export default router;
