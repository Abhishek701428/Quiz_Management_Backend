import { Router } from 'express';
const router = Router();

import * as CustomerData from '../Customer Data/customerdata-controller';
import { authenticateSuperAdminAndAdmin, authenticateUsers } from '../../../middleware/authMiddleware';
import { authorizeAccess } from '../../../middleware/get.authentication';
//truck routes
router.post('/create', authenticateUsers, authorizeAccess, CustomerData.createCompany);

router.get('/getAll', authenticateUsers, authorizeAccess, CustomerData.getAllCompanies);

router.put('/update/:id', authenticateSuperAdminAndAdmin, CustomerData.updateCompany);

router.delete('/delete/:id', authenticateSuperAdminAndAdmin, CustomerData.deleteCompany);

export default router;
