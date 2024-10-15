import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
import db from './database/db'
import path from 'path';
import * as dotenv from "dotenv";
import usersRoutes from './modules/User_Authentication/user-routes';
import quizRoutes from './modules/Quiz_Managment/quiz-router';


dotenv.config();
db();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(cors({
  origin: '*'
}));
app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Routes
app.get('/', (req: Request, res: Response) => {
  res.send(`<h1>Hi, I am Hi Tech Project!</h1>`);
});

//For Users 
app.use('/api', usersRoutes);
//For Quiz
app.use('/api/quiz', quizRoutes);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
