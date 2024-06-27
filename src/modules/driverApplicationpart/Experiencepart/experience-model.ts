import mongoose, { Document, Schema } from 'mongoose';

interface IExperience extends Document {
    TypeOfVehicleDriven: string;
    From: Date;
    To: Date;
    ApproximateMileageDriven: number;
}

const ExperienceSchema: Schema = new Schema({
    TypeOfVehicleDriven: { type: String, required: true },
    From: { type: Date, required: true },
    To: { type: Date, required: true },
    ApproximateMileageDriven: { type: Number, required: true }
});

const Experience = mongoose.model<IExperience>('Experience', ExperienceSchema);

export { Experience, IExperience };
