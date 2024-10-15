import mongoose, { Schema, Document } from 'mongoose';

interface IQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface IQuiz extends Document {
  title: string;
  description: string;
  questions: IQuestion[];
}

const QuestionSchema: Schema = new Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: Number, required: true },
});

const QuizSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  questions: [QuestionSchema],
});

export default mongoose.model<IQuiz>('Quiz', QuizSchema);
