import { Router } from 'express';
import { createAccident, getAccidents, updateAccident, deleteAccident } from '../Accidentpart/accident-controller';

const router = Router();

router.post('/create', createAccident);
router.get('/getall', getAccidents);
router.put('/update/:id', updateAccident);
router.delete('/delete/:id', deleteAccident);

export default router;
