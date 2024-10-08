import { Request, Response } from 'express';
import FileManager from '../Customer Data/custmerdata-model';
import { cloudinaryMiddleware } from '../../../middleware/cloudinaryMiddleware';

export const createCompany = async (req: Request, res: Response) => {
  try {
    cloudinaryMiddleware(req, res, async function (err: any) {
      if (err) {
        console.error('File upload error:', err);
        return res.status(400).json({ message: "File upload failed" });
      }

      const user = (req as any).user;
      const adminId = user.adminId;

      const FileManagerData = {
        ...req.body,
        createdBy: user._id,
        adminId
      };

      // Handle file uploads from req.cloudinaryUrls
      const cloudinaryUrls = (req as any).cloudinaryUrls;
      if (cloudinaryUrls) {
        FileManagerData.fileUpload = cloudinaryUrls['fileUpload'] || FileManagerData.fileUpload;
      }

      const truck = new FileManager(FileManagerData);

      try {
        await truck.validate();
        await truck.save();
        res.status(201).json(truck);
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
    const { id } = req.params;

    const userId = (req as any).user._id;

    cloudinaryMiddleware(req, res, async function (err: any) {
      if (err) {
        console.error('File upload error:', err);
        return res.status(400).json({ message: "File upload failed" });
      }

      const company = await FileManager.findById(id);

      if (!company) {
        return res.status(404).json({ message: "Copmay not found" });
      }

      const companyData = { ...req.body };

      // Handle file uploads from req.cloudinaryUrls
      const cloudinaryUrls = (req as any).cloudinaryUrls;
      if (cloudinaryUrls) {
        companyData.fileUpload = cloudinaryUrls['fileUpload'] || companyData.fileUpload;
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

export const getAllCompanies = async (req: Request, res: Response) => {
  try {
    const query = (req as any).accessQuery; // Use the query attached by the middleware
    const trucks = await FileManager.find(query);
    res.status(200).json(trucks);
  } catch (error) {
    console.error('Error in getAllTrucks:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteCompany = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await FileManager.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: 'Truck not found' });
    }
    res.json({ message: 'Truck deleted successfully' });
  } catch (error) {
    console.error('Error in deleteTruck:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getCompanyById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Truck ID is required' });
    }
    const truck = await FileManager.findById(id);
    if (!truck) {
      return res.status(404).json({ message: 'Truck not found' });
    }
    res.json(truck);
  } catch (error) {
    console.error('Error in getTruckbyId:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create a new company
// export const createCompany = async (req, res) => {
//   try {
//     const company = new CustomerData({
//       ...req.body,
//       createdBy: req.user._id,
//       adminId: req.user.adminId || req.user._id
//     });

//     try {
//       await company.validate();
//       await company.save();
//       res.status(201).json(company);
//     } catch (validationError) {
//       res.status(400).json({ message: validationError.message });
//     }

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// Get all companies
// const getAllCompanies = async (req: Request, res: Response) => {
//   try {
//     const companies = await CustomerData.find();
//     res.status(200).json(companies);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update a company's status
// const updateCompany = async (req, res) => {
//   const { id } = req.params;
//   const updateData = req.body;

//   try {
//     const company = await CustomerData.findById(id);
//     if (!company) {
//       return res.status(404).json({ message: 'Company not found' });
//     }

//     company.set({
//       ...updateData,
//       updatedBy: req.user._id 
//     });

//     try {
//       await company.save();
//       res.status(200).json(company);
//     } catch (validationError) {
//       res.status(400).json({ message: validationError.message });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


// // Delete a company
// const deleteCompany = async (req: Request, res: Response) => {
//   const { id } = req.params;

//   try {
//     const company = await CustomerData.findByIdAndDelete(id);
//     if (!company) {
//       return res.status(404).json({ message: 'Company not found' });
//     }
//     res.status(200).json({ message: 'Company deleted' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export { createCompany, getAllCompanies, updateCompany, deleteCompany };
