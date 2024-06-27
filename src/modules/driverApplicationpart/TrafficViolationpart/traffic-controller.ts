import { Request, Response } from 'express';
import { TrafficViolation } from '../TrafficViolationpart/traffic-model';

export const createTrafficViolation = async (req: Request, res: Response) => {
    try {
        const trafficViolation = new TrafficViolation(req.body);
        await trafficViolation.save();
        res.status(201).send(trafficViolation);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getTrafficViolations = async (req: Request, res: Response) => {
    try {
        const trafficViolations = await TrafficViolation.find();
        res.status(200).send(trafficViolations);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateTrafficViolation = async (req: Request, res: Response) => {
    try {
        const trafficViolation = await TrafficViolation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!trafficViolation) {
            return res.status(404).send({ message: 'Traffic Violation not found' });
        }
        res.status(200).send(trafficViolation);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deleteTrafficViolation = async (req: Request, res: Response) => {
    try {
        const trafficViolation = await TrafficViolation.findByIdAndDelete(req.params.id);
        if (!trafficViolation) {
            return res.status(404).send({ message: 'Traffic Violation not found' });
        }
        res.status(200).send({ message: 'Traffic Violation deleted' });
    } catch (error) {
        res.status(500).send(error);
    }
};
