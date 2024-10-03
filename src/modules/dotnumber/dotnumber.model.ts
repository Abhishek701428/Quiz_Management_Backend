import mongoose, { Document, Schema } from 'mongoose';

export interface IDot extends Document {
  data: any; 
}

const DotSchema: Schema = new Schema({
  data: { type: Schema.Types.Mixed, required: true }, // For flexible data
}, { timestamps: true });

export const Dot = mongoose.model<IDot>('Dot', DotSchema);
