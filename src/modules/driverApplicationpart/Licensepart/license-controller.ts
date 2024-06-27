import { Request, Response } from 'express';
import { License } from '../Licensepart/license-model';

export const createLicense = async (req: Request, res: Response) => {
    try {
        const license = new License(req.body);
        await license.save();
        res.status(201).send(license);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getLicenses = async (req: Request, res: Response) => {
    try {
        const licenses = await License.find();
        res.status(200).send(licenses);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateLicense = async (req: Request, res: Response) => {
    try {
        const license = await License.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!license) {
            return res.status(404).send({ message: 'License not found' });
        }
        res.status(200).send(license);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deleteLicense = async (req: Request, res: Response) => {
    try {
        const license = await License.findByIdAndDelete(req.params.id);
        if (!license) {
            return res.status(404).send({ message: 'License not found' });
        }
        res.status(200).send({ message: 'License deleted' });
    } catch (error) {
        res.status(500).send(error);
    }
};
