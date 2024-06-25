import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
import db from './database/db'
import path from 'path';
import usersRoutes from './modules/authUsers/usersRoutes';
import truckRouter from "./modules/truckList/allRouter/router";
import * as dotenv from "dotenv";
import trailerRouter from "./modules/trailerList/trailer-routes";
import driverRouter from "./modules/driverList/driver-routes";
import driverapplicationRouter from './modules/driverApplication/driverApplication-routes'
import companyRouter from './modules/companyProfile/companyprofile-routes'
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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Routes
app.get('/', (req: Request, res: Response) => {
  res.send(`<h1>Hi, I am Hi Tech Project!</h1>`);
});

app.use('/api', usersRoutes);
app.use('/api/truckList', truckRouter);
app.use('/api/trailerList', trailerRouter)
app.use('/api/driverList', driverRouter)
app.use('/api/driverapplication', driverapplicationRouter)
app.use('/api/company', companyRouter)

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
