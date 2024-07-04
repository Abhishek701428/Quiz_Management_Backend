import { Request, Response } from 'express';
import Files from '../Files/file-model';

const createCompany = async (req: Request, res: Response) => {
  try {
    const company = new Files(req.body);
    await company.save();
    res.status(201).json(company);
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

const updateCompanyStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const company = await Files.findByIdAndUpdate(id, { status }, { new: true });
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(200).json(company);
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

export { createCompany, getAllCompanies, updateCompanyStatus, deleteCompany };
