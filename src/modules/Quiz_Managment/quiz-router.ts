import { Router } from 'express';
import { createQuiz, getAllQuizzes, getQuizDetails, submitQuiz } from './quiz.controller';
import { Protect } from '../../middleware/middleware';

const router = Router();

router.post('/create', Protect(['admin']), createQuiz);
router.get('/', getAllQuizzes);
router.get('/:id', getQuizDetails);
router.post('/:id/take', submitQuiz);

export default router;
