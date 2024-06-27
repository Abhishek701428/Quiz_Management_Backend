import mongoose, { Document, Schema } from 'mongoose';

interface ITrafficViolation extends Document {
    Date: Date;
    Violation: string;
    State: string;
    CommercialVehicle: boolean;
}

const TrafficViolationSchema: Schema = new Schema({
    Date: { type: Date, required: true },
    Violation: { type: String, required: true },
    State: { type: String, required: true },
    CommercialVehicle: { type: Boolean, required: true }
});

const TrafficViolation = mongoose.model<ITrafficViolation>('TrafficViolation', TrafficViolationSchema);

export { TrafficViolation, ITrafficViolation };
