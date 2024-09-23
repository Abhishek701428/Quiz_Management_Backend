import { Request, Response } from 'express';
import { cloudinaryMiddleware } from '../../middleware/cloudinaryMiddleware';
import Trailer from '../trailerList/trailer-model';

// Create a trailer
export const createTrailer = async (req: Request, res: Response) => {
    try {
        cloudinaryMiddleware(req, res, async function (err: any) {
            if (err) {
                console.error('File upload error:', err);
                return res.status(400).json({ message: "File upload failed" });
            }

            const user = (req as any).user;
            const adminId = user.adminId;

            const trailerData = {
                ...req.body,
                createdBy: user._id,
                adminId,
            };

            // Handle file uploads from req.cloudinaryUrls
            const cloudinaryUrls = (req as any).cloudinaryUrls;
            if (cloudinaryUrls) {
                trailerData.uploadDocument = cloudinaryUrls['uploadDocument'] || trailerData.uploadDocument;
                trailerData.uploadDocument1 = cloudinaryUrls['uploadDocument1'] || trailerData.uploadDocument1;
                trailerData.uploadDocument2 = cloudinaryUrls['uploadDocument2'] || trailerData.uploadDocument2;
                trailerData.uploadDocument3 = cloudinaryUrls['uploadDocument3'] || trailerData.uploadDocument3;
            }

            const trailer = new Trailer(trailerData);

            try {
                await trailer.validate();
                await trailer.save();
                res.status(201).json(trailer);
            } catch (validationError) {
                res.status(400).json({ message: validationError.message });
            }
        });
    } catch (error) {
        console.error('Error in createTrailer:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update a trailer
export const updateTrailer = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const userId = (req as any).user._id;

        cloudinaryMiddleware(req, res, async function (err: any) {
            if (err) {
                console.error('File upload error:', err);
                return res.status(400).json({ message: "File upload failed" });
            }

            const trailer = await Trailer.findById(id);

            if (!trailer) {
                return res.status(404).json({ message: "Trailer not found" });
            }

            const trailerData = { ...req.body };

            // Handle file uploads from req.cloudinaryUrls
            const cloudinaryUrls = (req as any).cloudinaryUrls;
            if (cloudinaryUrls) {
                trailerData.uploadDocument = cloudinaryUrls['uploadDocument'] || trailer.uploadDocument;
                trailerData.uploadDocument1 = cloudinaryUrls['uploadDocument1'] || trailer.uploadDocument1;
                trailerData.uploadDocument2 = cloudinaryUrls['uploadDocument2'] || trailer.uploadDocument2;
                trailerData.uploadDocument3 = cloudinaryUrls['uploadDocument3'] || trailer.uploadDocument3;
            }

            trailer.set(trailerData);

            trailer.updatedBy = userId;

            try {
                await trailer.save();
                res.status(200).json(trailer);
            } catch (validationError) {
                res.status(400).json({ message: validationError.message });
            }
        });
    } catch (error) {
        console.error('Error in updateTrailer:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a truck
export const deleteTrailer = async (req, res) => {
    try {
        const { id } = req.params;
        await Trailer.findByIdAndDelete(id);
        res.json({ message: 'Trailer deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all trucks
export const getTrailerAll = async (req: Request, res: Response) => {
    try {
        const query = (req as any).accessQuery;
        const trailers = await Trailer.find(query);
        res.status(200).json(trailers);
      } catch (error) {
        console.error('Error in getAllTrailers:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
  };


export const getTrailerbyId = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Trailer ID is required' });
        }
        const trailer = await Trailer.findById(id);
        if (!trailer) {
            return res.status(404).json({ message: 'Trailer not found' });
        }
        res.json(trailer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};