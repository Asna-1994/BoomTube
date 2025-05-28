import mongoose, { Schema, Document } from 'mongoose';



export interface IPurchase extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  videoId: mongoose.Types.ObjectId;
  amount: number;
  createdAt: Date;
}

const PurchaseSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  videoId: { type: Schema.Types.ObjectId, ref: 'Video', required: true },
  amount: { type: Number, required: true },
}, { timestamps: true });

PurchaseSchema.index({ userId: 1, videoId: 1 }); 

export default mongoose.model<IPurchase>('Purchase', PurchaseSchema);
