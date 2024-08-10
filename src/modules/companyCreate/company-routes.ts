import { Router } from 'express';
const router = Router();
import * as companyController from '../companyCreate/company-controller';
import { authenticateSuperAdminAndAdmin } from '../../middleware/authMiddleware';

router.post('/create', companyController.createCarrier);
router.get('/getAll', companyController.getAllCarriers);
router.get('/get/:id', companyController.getCarrierById);

router.put('/update/:id', authenticateSuperAdminAndAdmin, companyController.updateCarrier);
router.delete('/delete/:id', authenticateSuperAdminAndAdmin, companyController.deleteCarrier);

export default router;
