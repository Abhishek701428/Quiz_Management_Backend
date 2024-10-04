import axios from 'axios';
import { Request, Response } from 'express';
import { Dot } from '../dotnumber/dotnumber.model';

const API_URL = 'https://www.kodebuilder.com/dotsearch.php?dotNo=';

export const saveDOTData = async (req: Request, res: Response) => {
    const { dot } = req.body; 

    if (!dot) {
      return res.status(400).json({ message: 'DOT number is required.' });
    }
  
    try {
      // Fetch data from the specified URL
      const response = await axios.get(`${API_URL}${dot}`);

      const existingDot = await Dot.findOne({ 'data': response.data });

      if (existingDot) {
        return res.status(400).json({ message: 'This DOT data already exists in the database.' });
      }
   
      const newDot = new Dot({
        data: response.data,
      });
  
      await newDot.save();
  
      res.status(201).json({ message: 'DOT data saved successfully.', dot: newDot });
    } catch (error) {
      console.error('Error fetching or saving DOT data:', error);
      
      if (axios.isAxiosError(error)) {

        return res.status(500).json({ message: 'Error fetching data from the external API.' });
      }
      
      res.status(500).json({ message: 'Internal server error.' });
    }
};

export const getDOTData = async (req: Request, res: Response) => {
  const { dot } = req.params;

  try {
    // Find the data by dotNumber within the nested data structure
    const dotData = await Dot.findOne({ 'data.record.content.carrier.dotNumber': parseInt(dot) });

    if (!dotData) {
      return res.status(404).json({ message: 'DOT data not found for this number.' });
    }

    res.status(200).json({ data: dotData });
  } catch (error) {
    console.error('Error fetching DOT data:', error);
    res.status(500).json({ message: 'Error fetching DOT data.', error });
  }
};


export const updateDOTData = async (req: Request, res: Response) => {
  const { dot } = req.params; // The DOT number to be updated
  const { newDot } = req.body; // New DOT number to fetch data from

  if (!dot || !newDot) {
      return res.status(400).json({ message: 'Both existing and new DOT numbers are required.' });
  }

  try {
      // Fetch data from the specified URL using the new DOT number
      const response = await axios.get(`${API_URL}${newDot}`);

      // Find the existing DOT record using the existing DOT number
      const existingDot = await Dot.findOne({ dot });

      if (!existingDot) {
          return res.status(404).json({ message: 'DOT data not found for this number.' });
      }

      // Replace the existing record's data with the new data
      existingDot.data = response.data; // Replace data with new data

      await existingDot.save(); // Save the updated record

      res.status(200).json({ message: 'DOT data updated successfully.', dot: existingDot });
  } catch (error) {
      console.error('Error fetching or updating DOT data:', error);

      if (axios.isAxiosError(error)) {
          return res.status(500).json({ message: 'Error fetching data from the external API.' });
      }

      res.status(500).json({ message: 'Internal server error.' });
  }
};

