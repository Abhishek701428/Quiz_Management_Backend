import { Request, Response } from 'express';
import Files from '../Files/file-model';

const createCompany = async (req: Request, res: Response) => {
  try {
    const company = new Files(req.body);
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


const getAllCompanies = async (req: Request, res: Response) => {
  try {
    const companies = await Files.find();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCompany = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const company = await Files.findById(id);
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


const deleteCompany = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const company = await Files.findByIdAndDelete(id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(200).json({ message: 'Company deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createCompany, getAllCompanies, updateCompany, deleteCompany };
