
import mongoose, { Schema, Document } from 'mongoose';

export interface IComment extends Document {
  _id: mongoose.Types.ObjectId;
  content: string;
  userId :  mongoose.Types.ObjectId;
  videoId: mongoose.Types.ObjectId;
  createdAt: Date;
}

export interface ICommentPopulated extends Omit<IComment, 'userId'> {
  userId: {
    _id :  mongoose.Types.ObjectId,
    firstName : string;
    lastName : string;
}
}

const CommentSchema: Schema = new Schema({
  content: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  videoId: { type: Schema.Types.ObjectId, ref: 'Video', required: true },
}, { timestamps: true });

export default mongoose.model<IComment>('Comment', CommentSchema);
