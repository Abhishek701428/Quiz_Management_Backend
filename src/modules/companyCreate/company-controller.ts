import { Request, Response } from 'express';
import CarrierModel from '../companyCreate/company-model';

// Create a new carrier
export const createCarrier = async (req: Request, res: Response) => {
    try {
        const newCarrier = new CarrierModel(req.body);

        await newCarrier.validate();

        const savedCarrier = await newCarrier.save();
        res.status(201).json(savedCarrier);
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
};

// Get all carriers
export const getAllCarriers = async (req: Request, res: Response) => {
    try {
        const carriers = await CarrierModel.find();
        res.status(200).json(carriers);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get carrier by ID
export const getCarrierById = async (req: Request, res: Response) => {
    try {
        const carrier = await CarrierModel.findById(req.params.id);
        if (carrier) {
            res.status(200).json(carrier);
        } else {
            res.status(404).json({ message: 'Carrier not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update a carrier by ID
export const updateCarrier = async (req: Request, res: Response) => {
    try {
        const updatedCarrier = await CarrierModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (updatedCarrier) {
            res.status(200).json(updatedCarrier);
        } else {
            res.status(404).json({ message: 'Carrier not found' });
        }
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
};

// Delete a carrier by ID
export const deleteCarrier = async (req: Request, res: Response) => {
    try {
        const deletedCarrier = await CarrierModel.findByIdAndDelete(req.params.id);
        if (deletedCarrier) {
            res.status(200).json({ message: 'Carrier deleted successfully' });
        } else {
            res.status(404).json({ message: 'Carrier not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
