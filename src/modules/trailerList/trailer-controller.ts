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
            

            // Handle file uploads
            if (req.files && req.files.length > 0) {
                req.files.forEach(file => {
                    if (file.fieldname === 'uploadDocument') {
                        trailerData.uploadDocument = file.filename;
                    } else if (file.fieldname === 'uploadDocument1') {
                        trailerData.uploadDocument1 = file.filename;
                    } else if (file.fieldname === 'uploadDocument2') {
                        trailerData.uploadDocument2 = file.filename;
                    } else if (file.fieldname === 'uploadDocument3') {
                        trailerData.uploadDocument3 = file.filename;
                    }
                });
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
                    if (file.fieldname === 'uploadDocument') {
                        trailer.uploadDocument = file.filename;
                    } else if (file.fieldname === 'uploadDocument1') {
                        trailer.uploadDocument1 = file.filename;
                    } else if (file.fieldname === 'uploadDocument2') {
                        trailer.uploadDocument2 = file.filename;
                    } else if (file.fieldname === 'uploadDocument3') {
                        trailer.uploadDocument3 = file.filename;
                    }
                });
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
