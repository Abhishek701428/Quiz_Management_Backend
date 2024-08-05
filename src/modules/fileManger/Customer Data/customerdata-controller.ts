import { Request, Response } from 'express';
import CustomerData from '../Customer Data/custmerdata-model';

// Create a new company
const createCompany = async (req: Request, res: Response) => {
  try {
    const company = new CustomerData(req.body);
    try {
      await company.validate();
      await company.save();
      res.status(201).json(company);
    } catch (validationError) {
      res.status(400).json({ message: validationError.message });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all companies
const getAllCompanies = async (req: Request, res: Response) => {
  try {
    const companies = await CustomerData.find();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a company's status
const updateCompany = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const company = await CustomerData.findById(id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    company.set(updateData);
    
    try {
      await company.save();
      res.status(200).json(company);
    } catch (validationError) {
      res.status(400).json({ message: validationError.message });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Delete a company
const deleteCompany = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const company = await CustomerData.findByIdAndDelete(id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(200).json({ message: 'Company deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createCompany, getAllCompanies, updateCompany, deleteCompany };
