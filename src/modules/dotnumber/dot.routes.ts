import { Router } from 'express';
import { saveDOTData, getDOTData } from '../dotnumber/dot.controller';
import { authenticateUsers,authenticateSuperAdminAndAdmin } from '../../middleware/authMiddleware';
const router = Router();

router.post('/dotdata',authenticateSuperAdminAndAdmin, saveDOTData); 
router.get('/dotdata/:dot', getDOTData); 

export default router;
