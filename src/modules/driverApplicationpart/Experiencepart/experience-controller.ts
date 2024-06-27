import { Request, Response } from 'express';
import { Experience } from '../Experiencepart/experience-model';

export const createExperience = async (req: Request, res: Response) => {
    try {
        const experience = new Experience(req.body);
        await experience.save();
        res.status(201).send(experience);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getExperiences = async (req: Request, res: Response) => {
    try {
        const experiences = await Experience.find();
        res.status(200).send(experiences);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateExperience = async (req: Request, res: Response) => {
    try {
        const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!experience) {
            return res.status(404).send({ message: 'Experience not found' });
        }
        res.status(200).send(experience);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deleteExperience = async (req: Request, res: Response) => {
    try {
        const experience = await Experience.findByIdAndDelete(req.params.id);
        if (!experience) {
            return res.status(404).send({ message: 'Experience not found' });
        }
        res.status(200).send({ message: 'Experience deleted' });
    } catch (error) {
        res.status(500).send(error);
    }
};
