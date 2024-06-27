import { Router } from 'express';
import { createTrafficViolation, getTrafficViolations, updateTrafficViolation, deleteTrafficViolation } from '../TrafficViolationpart/traffic-controller';

const router = Router();

router.post('/create', createTrafficViolation);
router.get('/getall', getTrafficViolations);
router.put('/update/:id', updateTrafficViolation);
router.delete('/delete/:id', deleteTrafficViolation);

export default router;
