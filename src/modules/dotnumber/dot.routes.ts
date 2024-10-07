import { Router } from 'express';
import { saveDOTData, getDOTData ,updateDOTData} from '../dotnumber/dot.controller';
import { authenticateUsers, authenticateSuperAdminAndAdmin } from '../../middleware/authMiddleware';
const router = Router();

router.post('/dotdata', authenticateSuperAdminAndAdmin, saveDOTData);
router.get('/dotdata/:dot', getDOTData);
router.put('/dotdata/:id', updateDOTData);
export default router;
