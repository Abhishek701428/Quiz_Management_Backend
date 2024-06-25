import { Request, Response, NextFunction } from 'express';

export const filterByUser = (model: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user._id; // Use type assertion to bypass TypeScript error
        const records = await model.find({ addedBy: userId });
        (req as any).filteredRecords = records; // Use type assertion to bypass TypeScript error
        next();
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
