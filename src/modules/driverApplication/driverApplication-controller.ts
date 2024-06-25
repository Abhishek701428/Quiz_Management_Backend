// import multer from 'multer';
// import fs from 'fs';
// import { Driver, IDriver } from '../driverApplication/driverApplication-model';

// const storage = multer.diskStorage({
//     destination: function (req, file, callback) {
//         const uploadPath = 'uploads';
//         if (!fs.existsSync(uploadPath)) {
//             fs.mkdirSync(uploadPath, { recursive: true });
//         }
//         callback(null, uploadPath);
//     },
//     filename: function (req, file, callback) {
//         callback(null, file.originalname);
//     }
// });

// // File filter function
// const fileFilter = function (req, file, callback) {
//     const allowedMimes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
//     if (allowedMimes.includes(file.mimetype)) {
//         callback(null, true);
//     } else {
//         callback(new Error('Invalid file type. Only PDF, JPG, JPEG, and PNG files are allowed.'));
//     }
// };
// const upload = multer({
//     storage: storage,
//     fileFilter: fileFilter
// }).any();

// // Controller function to handle file upload and create a new driver
// export const createDriver = async (req, res) => {
//     try {
//         upload(req, res, async function (err) {
//             if (err) {
//                 console.error(err);
//                 return res.status(400).json({ message: "File upload failed" });
//             }

//             const driverData = req.body;

//             if (req.files && req.files.length > 0) {
//                 req.files.forEach(file => {
//                     if (file.fieldname === 'ApplicantsSignature') {
//                         driverData.ApplicantsSignature = file.filename;
//                     } else if (file.fieldname === 'ApplicantsSignatures') {
//                         driverData.ApplicantsSignatures = file.filename;
//                     } else if (file.fieldname === 'WitnessSignature') {
//                         driverData.WitnessSignature = file.filename;
//                     }
                
//                 });
//             }

//             const driver = new Driver(driverData);
//             await driver.save();
//             res.status(201).json(driver);
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(400).json({ message: error.message });
//     }
// };

// // Controller function to update a driver by ID with files
// export const updateDriver = async (req, res) => {
//     try {
//         const { id } = req.params;

//         upload(req, res, async function (err) {
//             if (err) {
//                 console.error(err);
//                 return res.status(400).json({ message: "File upload failed" });
//             }

//             const driver = await Driver.findById(id);

//             if (!driver) {
//                 return res.status(404).json({ message: "Driver not found" });
//             }

//             driver.set(req.body);

//             if (req.files && req.files.length > 0) {
//                 req.files.forEach(file => {
//                     if (file.fieldname === 'ApplicantsSignature') {
//                         driver.Certification.ApplicantsSignature = file.filename;
//                     } else if (file.fieldname === 'ApplicantsSignatures') {
//                         if (driver.ControlledSubstanceAndAlcohol.length > 0) {
//                             driver.ControlledSubstanceAndAlcohol[0].ApplicantsSignatures = file.filename;
//                         }
//                     } else if (file.fieldname === 'WitnessSignature') {
//                         if (driver.ControlledSubstanceAndAlcohol.length > 0) {
//                             driver.ControlledSubstanceAndAlcohol[0].WitnessSignature = file.filename;
//                         }
//                     }
               
//                 });
//             }

//             await driver.save();
//             res.status(200).json(driver);
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(400).json({ message: error.message });
//     }
// };


// // Controller function to get all drivers
// export const getAllDrivers = async (req, res) => {
//     try {
//         const drivers = await Driver.find();
//         res.status(200).json(drivers);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server Error" });
//     }
// };


// // Controller function to delete a driver by ID
// export const deleteDriver = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const driver = await Driver.findByIdAndDelete(id);
//         if (!driver) {
//             return res.status(404).json({ message: "Driver not found" });
//         }
//         res.status(200).json({ message: "Driver deleted successfully" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server Error" });
//     }
// };
