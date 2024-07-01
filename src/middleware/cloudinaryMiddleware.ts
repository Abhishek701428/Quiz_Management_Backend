import cloudinary from 'cloudinary';
import multer from 'multer';
import { Readable } from 'stream';

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const storage = multer.memoryStorage();

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

export interface CloudinaryUploadResponse {
    secure_url: string;
}

// Helper function to upload files to Cloudinary
export const uploadToCloudinary = (fileBuffer: Buffer, filename: string): Promise<CloudinaryUploadResponse> => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.v2.uploader.upload_stream(
            { public_id: filename, resource_type: 'raw' },
            (error, result) => {
                if (error) reject(error);
                else resolve(result as CloudinaryUploadResponse);
            }
        );
        Readable.from(fileBuffer).pipe(uploadStream);
    });
};

// Cloudinary middleware function
export const cloudinaryMiddleware = async (req, res, next) => {
    try {
        upload(req, res, async function (err) {
            if (err) {
                console.error(err);
                return res.status(400).json({ message: "File upload failed" });
            }

            if (req.files && req.files.length > 0) {
                req.cloudinaryUrls = {};
                for (const file of req.files) {
                    const result = await uploadToCloudinary(file.buffer, file.originalname);
                    req.cloudinaryUrls[file.fieldname] = result.secure_url;
                }
            }
            next();
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
