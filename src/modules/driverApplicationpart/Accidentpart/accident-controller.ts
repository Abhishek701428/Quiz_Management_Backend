import { Request, Response } from 'express';
import { Accident } from '../Accidentpart/accident-model';

export const createAccident = async (req: Request, res: Response) => {
    try {
        const accident = new Accident(req.body);
        await accident.save();
        res.status(201).send(accident);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getAccidents = async (req: Request, res: Response) => {
    try {
        const accidents = await Accident.find();
        res.status(200).send(accidents);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateAccident = async (req: Request, res: Response) => {
    try {
        const accident = await Accident.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!accident) {
            return res.status(404).send({ message: 'Accident not found' });
        }
        res.status(200).send(accident);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deleteAccident = async (req: Request, res: Response) => {
    try {
        const accident = await Accident.findByIdAndDelete(req.params.id);
        if (!accident) {
            return res.status(404).send({ message: 'Accident not found' });
        }
        res.status(200).send({ message: 'Accident deleted' });
    } catch (error) {
        res.status(500).send(error);
    }
};
