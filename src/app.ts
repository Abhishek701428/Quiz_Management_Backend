import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
import db from './database/db'
import path from 'path';
import * as dotenv from "dotenv";
import usersRoutes from './modules/authUsers/usersRoutes';
import truckRouter from "./modules/truckList/router";
import trailerRouter from "./modules/trailerList/trailer-routes";
import driverRouter from "./modules/driverList/driver-routes";
import driverapplicationRouter from './modules/driverApplication/driverApplication-routes'
import companyRouter from './modules/companyProfile/companyprofile-routes'
import companyCarrierRouter from './modules/companyCreate/company-routes'
import accidentRouter from './modules/driverApplicationpart/Accidentpart/accident-routes'
import experinceRouter from './modules/driverApplicationpart/Experiencepart/experience-routes'
import licenseRouter from './modules/driverApplicationpart/Licensepart/license-routes'
import voilationRouter from './modules/driverApplicationpart/TrafficViolationpart/traffic-routes'
import customerData from './modules/fileManger/Customer Data/customerdata-routes'
import files from './modules/fileManger/Files/file-routes'
import router from './permission/permission-update';
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
//For Trucks
app.use('/api/truckList', truckRouter);
//For Trailers
app.use('/api/trailerList', trailerRouter)
//For Drivers
app.use('/api/driverList', driverRouter)
//For Driver Application
app.use('/api/driverapplication', driverapplicationRouter)
//For Company Profile
app.use('/api/company', companyRouter)
app.use('/api/companycarrier', companyCarrierRouter)
//For DriverApplications Part 
app.use('/api/accident', accidentRouter)
app.use('/api/experince', experinceRouter)
app.use('/api/license', licenseRouter)
app.use('/api/voilation', voilationRouter)
// File Manager Module
app.use('/api/customerdata', customerData)
app.use('/api/file', files)
//update permissions
app.use(router)

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
