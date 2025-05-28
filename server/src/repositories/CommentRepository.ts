import { CreateCommentDto } from "../dto/CommentDto";
import Comment, { IComment, ICommentPopulated } from "../entities/Comments";
import { ICommentRepository } from "../Interfaces/RepositoryInterface/ICommentRepository";


export class CommentRepository implements ICommentRepository {
  constructor() {

  }

    async create(commentData: CreateCommentDto): Promise<ICommentPopulated> {
    const comment = new Comment({
      content: commentData.content,
      userId: commentData.userId,
      videoId: commentData.videoId,
    });
 await comment.save();
 const populatedComment = await comment.populate('userId' , 'firstName lastName')
    return populatedComment as unknown as ICommentPopulated;
  }

  async findByVideoId(videoId: string , page : number, limit:number): Promise<{comments : ICommentPopulated[], totalCount :number}> {
      const skip = (page - 1) * limit;
   const comments = await Comment.find({  videoId })
      .populate('userId', 'firstName lastName')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean()
    .exec();
    const totalCount = await Comment.find({  videoId }).countDocuments()
       return {
        comments : comments as unknown as ICommentPopulated[],
        totalCount
       } 
  }

  async findById(id: string): Promise<ICommentPopulated | null> {
   const comment =  await Comment.findById(id).populate('userId', 'firstName lastName')
    .lean()
    .exec();
    return comment as unknown as ICommentPopulated
  }

  async deleteById(id: string): Promise<boolean> {
    const result = await Comment.findByIdAndDelete(id);
    return !!result;
  }


}