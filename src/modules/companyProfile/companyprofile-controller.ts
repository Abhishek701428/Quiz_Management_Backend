import { Request, Response } from 'express';
import multer from 'multer';
import fs from 'fs';
import Company from '../companyProfile/companyprofile-model';
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        const uploadPath = 'uploads';
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        callback(null, uploadPath);
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

// Define file filter function
const fileFilter = function (req, file, callback) {
    const allowedMimes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    if (allowedMimes.includes(file.mimetype)) {
        callback(null, true);
    } else {
        callback(new Error('Invalid file type. Only PDF, JPG, JPEG, and PNG files are allowed.'));
    }
};

// Multer upload middleware configuration with storage and file filter
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
}).any();

export const createCompany = async (req: Request, res: Response) => {
    try {
        upload(req, res, async function (err) {
            if (err) {
                console.error(err);
                return res.status(400).json({ message: "File upload failed" });
            }

            const companyData = req.body;

            // Handle file uploads
            if (req.files && Array.isArray(req.files) && req.files.length > 0) {
                req.files.forEach(file => {
                    if (file.fieldname === 'uploadDocument') {
                        companyData.uploadDocument = file.filename;
                    } else if (file.fieldname === 'kyuUploadDocument') {
                        companyData.kyuUploadDocument = file.filename;
                    } else if (file.fieldname === 'nyUploadDocument') {
                        companyData.nyUploadDocument = file.filename;
                    } else if (file.fieldname === 'w9UploadDocument') {
                        companyData.w9UploadDocument = file.filename;
                    } else if (file.fieldname === 'insuranceDocument') {
                        companyData.insuranceDocument = file.filename;
                    } else if (file.fieldname === 'registrationUploadDocument') {
                        companyData.registrationUploadDocument = file.filename;
                    } else if (file.fieldname === 'trailerUploadDocument') {
                        companyData.trailerUploadDocument = file.filename;
                    } else if (file.fieldname === 'randomDtUploadDocument') {
                        companyData.randomDtUploadDocument = file.filename;
                    }
                });
            }

            const company = new Company(companyData);

            await company.save();
            res.status(201).json(company);
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const updateCompany = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        upload(req, res, async function (err) {
            if (err) {
                console.error(err);
                return res.status(400).json({ message: "File upload failed" });
            }

            const company = await Company.findById(id);

            if (!company) {
                return res.status(404).json({ message: "Company not found" });
            }

            company.set(req.body);

            // Handle file uploads
            if (req.files && Array.isArray(req.files) && req.files.length > 0) {
                req.files.forEach(file => {
                    if (file.fieldname === 'uploadDocument') {
                        company.uploadDocument = file.filename;
                    } else if (file.fieldname === 'kyuUploadDocument') {
                        company.kyuUploadDocument = file.filename;
                    } else if (file.fieldname === 'nyUploadDocument') {
                        company.nyUploadDocument = file.filename;
                    } else if (file.fieldname === 'w9UploadDocument') {
                        company.w9UploadDocument = file.filename;
                    } else if (file.fieldname === 'insuranceDocument') {
                        company.insuranceDocument = file.filename;
                    } else if (file.fieldname === 'registrationUploadDocument') {
                        company.registrationUploadDocument = file.filename;
                    } else if (file.fieldname === 'trailerUploadDocument') {
                        company.trailerUploadDocument = file.filename;
                    } else if (file.fieldname === 'randomDtUploadDocument') {
                        company.randomDtUploadDocument = file.filename;
                    }
                });
            }

            await company.save();
            res.status(200).json(company);
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteCompany = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const company = await Company.findByIdAndDelete(id);

        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }

        res.status(200).json({ message: "Company deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAllCompanies = async (req: Request, res: Response) => {
    try {
        const companies = await Company.find();
        res.status(200).json(companies);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
