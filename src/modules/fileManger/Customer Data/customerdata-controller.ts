import { Request, Response } from 'express';
import CustomerData from '../Customer Data/custmerdata-model';

// Create a new company
const createCompany = async (req: Request, res: Response) => {
  try {
    const company = new CustomerData(req.body);
    await company.save();
    res.status(201).json(company);
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
const updateCompanyStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const company = await CustomerData.findByIdAndUpdate(id, { status }, { new: true });
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(200).json(company);
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

export { createCompany, getAllCompanies, updateCompanyStatus, deleteCompany };
