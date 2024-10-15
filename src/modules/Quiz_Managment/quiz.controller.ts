import { Request, Response } from 'express';
import Quiz from '../Quiz_Managment/quiz.models';

// Create a new quiz (Admin only)
export const createQuiz = async (req: Request, res: Response) => {
  const { title, description, questions } = req.body;

  const quiz = new Quiz({ title, description, questions });
  await quiz.save();

  res.status(201).json({ message: 'Quiz created successfully' });
};

// Get all quizzes
export const getAllQuizzes = async (req: Request, res: Response) => {
  const quizzes = await Quiz.find();
  res.json(quizzes);
};

// Get quiz details
export const getQuizDetails = async (req: Request, res: Response) => {
  const quiz = await Quiz.findById(req.params.id);
  if (!quiz) {
    return res.status(404).json({ message: 'Quiz not found' });
  }
  res.json(quiz);
};

// Submit quiz and calculate result
export const submitQuiz = async (req: Request, res: Response) => {
  const { answers } = req.body;
  const quiz = await Quiz.findById(req.params.id);

  if (!quiz) {
    return res.status(404).json({ message: 'Quiz not found' });
  }

  let score = 0;
  quiz.questions.forEach((question, index) => {
    if (question.correctAnswer === answers[index]) {
      score++;
    }
  });

  res.json({ score, totalQuestions: quiz.questions.length });
};

