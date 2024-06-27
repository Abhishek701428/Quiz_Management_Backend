import multer from 'multer';
import fs from 'fs';
import Truck from '../truckList/truck.models';

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
export const createTruck = async (req, res) => {
  try {
    upload(req, res, async function (err) {
      if (err) {
        console.error(err);
        return res.status(400).json({ message: "File upload failed" });
      }

      console.log(req.files);

      const truckData = req.body;
      // if (!req.user || !req.user._id) {
      //   return res.status(401).json({ message: "User not authenticated" });
      // }
      // truckData.addedBy = req.user._id;

      // Handle file uploads
      if (req.files && req.files.length > 0) {
        req.files.forEach(file => {
          if (file.fieldname === 'uploadDocument') {
            truckData.uploadDocument = file.filename;
          } else if (file.fieldname === 'uploadDocument1') {
            truckData.uploadDocument1 = file.filename;
          } else if (file.fieldname === 'uploadDocument2') {
            truckData.uploadDocument2 = file.filename;
          } else if (file.fieldname === 'uploadDocument3') {
            truckData.uploadDocument3 = file.filename;
          }
        });
      }

      const truck = new Truck(truckData);

      await truck.save();
      res.status(201).json(truck);
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a truck
export const updateTruck = async (req, res) => {
  try {
    const { id } = req.params;

    upload(req, res, async function (err) {
      if (err) {
        console.error(err);
        return res.status(400).json({ message: "File upload failed" });
      }

      console.log(req.files);

      const truck = await Truck.findById(id);

      if (!truck) {
        return res.status(404).json({ message: "Truck not found" });
      }

      truck.set(req.body);

      // Handle file uploads
      if (req.files && req.files.length > 0) {
        req.files.forEach(file => {
          if (file.fieldname === 'uploadDocument') {
            truck.uploadDocument = file.filename;
          } else if (file.fieldname === 'uploadDocument1') {
            truck.uploadDocument1 = file.filename;
          } else if (file.fieldname === 'uploadDocument2') {
            truck.uploadDocument2 = file.filename;
          } else if (file.fieldname === 'uploadDocument3') {
            truck.uploadDocument3 = file.filename;
          }
        });
      }
      await truck.save();
      res.status(200).json(truck);
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// Delete a truck
export const deleteTruck = async (req, res) => {
  try {
    const { id } = req.params;
    await Truck.findByIdAndDelete(id);
    res.json({ message: 'Truck deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all trucks
export const getTruckAll = async (req, res) => {
  try {
    const trucks = await Truck.find();
    // const userId = req.user._id;
    // const trucks = await Truck.find({ addedBy: userId });
    res.json(trucks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getApprovedTrucks = async (req, res) => {
  try {
    // const userId = req.user._id;
    // const trucks = await Truck.find({ addedBy: userId, status: 'APPROVED' });
    const trucks = await Truck.find({ status: 'APPROVED' });
    res.json(trucks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPendingTrucks = async (req, res) => {
  try {
    // const userId = req.user._id;
    // const trucks = await Truck.find({ addedBy: userId, status: 'PENDING' });
    const trucks = await Truck.find({ status: 'PENDING' });
    res.json(trucks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCancelledTrucks = async (req, res) => {
  try {
    // const userId = req.user._id;
    // const trucks = await Truck.find({ addedBy: userId, status: 'EXPIRING' });
    const trucks = await Truck.find({ status: 'EXPIRING' });
    res.json(trucks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};