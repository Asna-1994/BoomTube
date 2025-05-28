import mongoose, { Schema, Document } from 'mongoose';

export interface IVideo extends Document {
    _id : mongoose.Types.ObjectId;
  title: string;
  description: string;
  type: 'short' | 'long';
  videoUrl?: string ;
  videoFile?: {
    url: string,
    publicId: string
  },
  thumbnailUrl?: string;
  price: number;
  creator: mongoose.Types.ObjectId;
  createdAt: Date;
}

export interface IVideoPopulated extends Omit<IVideo, 'creator'> {
  creator: {
    _id :  mongoose.Types.ObjectId,
    firstName : string;
    lastName : string;
}
}

const VideoSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  type: { type: String, enum: ['short', 'long'], required: true },
  videoUrl: { type: String },
  videoFile:{
    url: String,
    publicId: String
  } ,
  thumbnailUrl: { type: String },
  price: { type: Number, default: 0 },
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export default mongoose.model<IVideo>('Video', VideoSchema);
