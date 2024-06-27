import { Router } from 'express';
import { createExperience, getExperiences, updateExperience, deleteExperience } from '../Experiencepart/experience-controller';

const router = Router();

router.post('/create', createExperience);
router.get('/getall', getExperiences);
router.put('/update/:id', updateExperience);
router.delete('/delete/:id', deleteExperience);

export default router;
