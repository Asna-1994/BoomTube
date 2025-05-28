
import mongoose, { Schema, Document } from 'mongoose';

export interface IGift extends Document {
  _id: mongoose.Types.ObjectId;
  senderId: mongoose.Types.ObjectId;
  creatorId: mongoose.Types.ObjectId;
  videoId: mongoose.Types.ObjectId;
  amount: number;
  createdAt: Date;
}

const GiftSchema: Schema = new Schema({
  senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  creatorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  videoId: { type: Schema.Types.ObjectId, ref: 'Video', required: true },
  amount: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model<IGift>('Gift', GiftSchema);
