import { Request, Response } from 'express';
import Company from '../companyProfile/companyprofile-model';
import { cloudinaryMiddleware } from '../../middleware/cloudinaryMiddleware';

export const createCompany = async (req: Request, res: Response) => {
    try {
        cloudinaryMiddleware(req, res, async function (err: any) {
            if (err) {
                console.error('File upload error:', err);
                return res.status(400).json({ message: "File upload failed" });
            }

            const user = (req as any).user;
            const superadminId = user.superadminId;
            const companyData = {
                ...req.body,
                createdBy: user._id,
                superadminId,
            };

            const cloudinaryUrls = (req as any).cloudinaryUrls;

            if (cloudinaryUrls) {
                companyData.uploadDocument = cloudinaryUrls['uploadDocument'] || companyData.uploadDocument;
                companyData.kyuUploadDocument = cloudinaryUrls['kyuUploadDocument'] || companyData.kyuUploadDocument;
                companyData.nyUploadDocument = cloudinaryUrls['nyUploadDocument'] || companyData.nyUploadDocument;
                companyData.w9UploadDocument = cloudinaryUrls['w9UploadDocument'] || companyData.w9UploadDocument;
                companyData.insuranceDocument = cloudinaryUrls['insuranceDocument'] || companyData.insuranceDocument;
                companyData.registrationUploadDocument = cloudinaryUrls['registrationUploadDocument'] || companyData.registrationUploadDocument;
                companyData.trailerUploadDocument = cloudinaryUrls['trailerUploadDocument'] || companyData.trailerUploadDocument;
                companyData.randomDtUploadDocument = cloudinaryUrls['randomDtUploadDocument'] || companyData.randomDtUploadDocument;
            }

            const company = new Company(companyData);

            try {
                await company.validate();
                await company.save();
                res.status(201).json(company);
            } catch (validationError) {
                res.status(400).json({ message: validationError.message });
            }
        });
    } catch (error) {
        console.error('Error in createCompany:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export const updateCompany = async (req: Request, res: Response) => {
    try {
        cloudinaryMiddleware(req, res, async function (err: any) {
            if (err) {
                console.error('File upload error:', err);
                return res.status(400).json({ message: "File upload failed" });
            }

            const { id } = req.params;
            const companyData = { ...req.body };
            const userId = (req as any).user._id;

            const cloudinaryUrls = (req as any).cloudinaryUrls;

            if (cloudinaryUrls) {
                companyData.uploadDocument = cloudinaryUrls['uploadDocument'] || companyData.uploadDocument;
                companyData.kyuUploadDocument = cloudinaryUrls['kyuUploadDocument'] || companyData.kyuUploadDocument;
                companyData.nyUploadDocument = cloudinaryUrls['nyUploadDocument'] || companyData.nyUploadDocument;
                companyData.w9UploadDocument = cloudinaryUrls['w9UploadDocument'] || companyData.w9UploadDocument;
                companyData.insuranceDocument = cloudinaryUrls['insuranceDocument'] || companyData.insuranceDocument;
                companyData.registrationUploadDocument = cloudinaryUrls['registrationUploadDocument'] || companyData.registrationUploadDocument;
                companyData.trailerUploadDocument = cloudinaryUrls['trailerUploadDocument'] || companyData.trailerUploadDocument;
                companyData.randomDtUploadDocument = cloudinaryUrls['randomDtUploadDocument'] || companyData.randomDtUploadDocument;
            }

            const company = await Company.findById(id);

            if (!company) {
                return res.status(404).json({ message: "Company not found" });
            }

            company.set(companyData);
            company.updatedBy = userId;
            try {
                await company.save();
                res.status(200).json(company);
            } catch (validationError) {
                res.status(400).json({ message: validationError.message });
            }
        });
    } catch (error) {
        console.error('Error in updateCompany:', error);
        res.status(500).json({ message: 'Internal server error' });
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
        const requester = (req as any).user;

        let companies;

        if (requester.role === 'superadmin') {
            // Superadmin can see all companies
            companies = await Company.find();
        } else if (requester.role === 'admin') {
            // Admin can see only their associated company
            companies = await Company.find({ _id: requester.companyId });
        } else if (requester.role === 'superadminuser') {
            // Superadmin user can see companies associated with their superadmin
            companies = await Company.find({ superadminId: requester.superadminId });
        } else {
            // Handle unauthorized access for other user types
            return res.status(403).json({ message: 'Access denied. Unauthorized user type.' });
        }

        res.status(200).json(companies);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const getCompanyById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Company ID is required' });
        }

        const company = await Company.findById(id);

        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        res.status(200).json(company);
    } catch (error) {
        console.error('Error in getCompanyById:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};