import mongoose, { Document, Schema } from 'mongoose';

interface IAccident extends Document {
    Date: Date;
    Describe: string;
    Fatalities: number;
    Injuries: number;
}

const AccidentSchema: Schema = new Schema({
    Date: { type: Date, required: true },
    Describe: { type: String, required: true },
    Fatalities: { type: Number, required: true },
    Injuries: { type: Number, required: true }
});

const Accident = mongoose.model<IAccident>('Accident', AccidentSchema);

export { Accident, IAccident };
