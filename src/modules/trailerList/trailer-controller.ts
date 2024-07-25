import { cloudinaryMiddleware } from '../../middleware/cloudinaryMiddleware';
import Trailer from '../trailerList/trailer-model';

// Create a trailer
export const createTrailer = async (req, res) => {
    try {
        // Use cloudinaryMiddleware here to handle file uploads
        cloudinaryMiddleware(req, res, async function (err) {
            if (err) {
                console.error(err);
                return res.status(400).json({ message: "File upload failed" });
            }

            const trailerData = req.body;

            // Handle file uploads from req.cloudinaryUrls
            if (req.cloudinaryUrls) {
                trailerData.uploadDocument = req.cloudinaryUrls['uploadDocument'];
                trailerData.uploadDocument1 = req.cloudinaryUrls['uploadDocument1'];
                trailerData.uploadDocument2 = req.cloudinaryUrls['uploadDocument2'];
                trailerData.uploadDocument3 = req.cloudinaryUrls['uploadDocument3'];
            }

            const trailer = new Trailer(trailerData);
            await trailer.save();
            res.status(201).json(trailer);
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a trailer
export const updateTrailer = async (req, res) => {
    try {
        const { id } = req.params;

        cloudinaryMiddleware(req, res, async function (err) {
            if (err) {
                console.error(err);
                return res.status(400).json({ message: "File upload failed" });
            }

            const trailer = await Trailer.findById(id);

            if (!trailer) {
                return res.status(404).json({ message: "Trailer not found" });
            }

            trailer.set(req.body);

            if (req.cloudinaryUrls) {
                trailer.uploadDocument = req.cloudinaryUrls['uploadDocument'];
                trailer.uploadDocument1 = req.cloudinaryUrls['uploadDocument1'];
                trailer.uploadDocument2 = req.cloudinaryUrls['uploadDocument2'];
                trailer.uploadDocument3 = req.cloudinaryUrls['uploadDocument3'];
            }

            await trailer.save();
            res.status(200).json(trailer);
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a truck
export const deleteTrailer = async (req, res) => {
    try {
        const { id } = req.params;
        await Trailer.findByIdAndDelete(id);
        res.json({ message: 'Truck deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all trucks
export const getTrailerAll = async (req, res) => {
    try {
        const trailer = await Trailer.find();

        res.json(trailer);
    } catch (error) {
        res.status(500).json({ message: error.message });
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