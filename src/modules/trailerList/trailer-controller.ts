import multer from 'multer';
import fs from 'fs';
import Trailer from '../trailerList/trailer-model';

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        const uploadPath = 'uploads';
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        callback(null, uploadPath);
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

// Define file filter function
const fileFilter = function (req, file, callback) {
    const allowedMimes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    if (allowedMimes.includes(file.mimetype)) {
        callback(null, true);
    } else {
        callback(new Error('Invalid file type. Only PDF, JPG, JPEG, and PNG files are allowed.'));
    }
};

// Multer upload middleware configuration with storage and file filter
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
}).any();

// Create a truck
export const createTrailer = async (req, res) => {
    try {
        upload(req, res, async function (err) {
            if (err) {
                console.error(err);
                return res.status(400).json({ message: "File upload failed" });
            }

            console.log(req.files);

            const trailerData = req.body;
            if (!req.user || !req.user._id) {
                return res.status(401).json({ message: "User not authenticated" });
            }
            trailerData.addedBy = req.user._id;

            // Handle file uploads
            if (req.files && req.files.length > 0) {
                req.files.forEach(file => {
                    if (file.fieldname === 'insuranceDocument') {
                        trailerData.insuranceDocument = file.filename;
                    } else if (file.fieldname === 'registrationDocument') {
                        trailerData.registrationDocument = file.filename;
                    } else if (file.fieldname === 'inspectionReport') {
                        trailerData.inspectionReport = file.filename;
                    } else if (file.fieldname === 'licenceDocument') {
                        trailerData.licenceDocument = file.filename;
                    }
                });
            }
            if (!trailerData.licenceDocument) {
                return res.status(400).json({ message: "licenceDocument is required" });
            }
            const trailer = new Trailer(trailerData);
            await trailer.save();
            res.status(201).json(trailer);
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a truck
export const updateTrailer = async (req, res) => {
    try {
        const { id } = req.params;

        upload(req, res, async function (err) {
            if (err) {
                console.error(err);
                return res.status(400).json({ message: "File upload failed" });
            }

            console.log(req.files);

            const trailer = await Trailer.findById(id);

            if (!trailer) {
                return res.status(404).json({ message: "Truck not found" });
            }

            trailer.set(req.body);

            // Handle file uploads
            if (req.files && req.files.length > 0) {
                req.files.forEach(file => {
                    if (file.fieldname === 'insuranceDocument') {
                        trailer.insuranceDocument = file.filename;
                    } else if (file.fieldname === 'registrationDocument') {
                        trailer.registrationDocument = file.filename;
                    } else if (file.fieldname === 'inspectionReport') {
                        trailer.inspectionReport = file.filename;
                    } else if (file.fieldname === 'licenceDocument') {
                        trailer.licenceDocument = file.filename;
                    }
                });
            }
            if (!trailer.licenceDocument) {
                return res.status(400).json({ message: "licenceDocument is required" });
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
        // const trailer = await Trailer.find();
        const userId = req.user._id;
        const trailer = await Trailer.find({ addedBy: userId });
        res.json(trailer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
