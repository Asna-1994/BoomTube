
import { CommentRepository } from '../repositories/CommentRepository';
import { VideoRepository } from '../repositories/VideoRepository';
import { CustomError } from '../middlewares/errorHandler';
import { STATUSCODE } from '../constants/StatusCodes';
import { IComment } from '../entities/Comments';
import { ICommentService } from '../Interfaces/ServiceInterface/ICommentService';
import { CommentResponseDto } from '../dto/CommentDto';


interface CreateCommentDTO {
  content: string;
  userId: string;
  videoId: string;
}

export class CommentService implements ICommentService {
  constructor(
    private commentRepository: CommentRepository,
    private videoRepository: VideoRepository,
  ) {}

  async createComment({ content, userId, videoId }: CreateCommentDTO): Promise<CommentResponseDto> {
    // Check if video exists
    const video = await this.videoRepository.findById(videoId);
    if (!video) {
      throw new CustomError('Video not found', STATUSCODE.NOT_FOUND);
    }

    // Create comment
    const comment = await this.commentRepository.create({
      content,
      userId,
      videoId,
    });


    return {   
         _id: comment._id.toString(),
    content: comment.content,
    createdAt: comment.createdAt,
    videoId: comment.videoId.toString(),
    userId: {
      _id: comment.userId._id.toString(),
      firstName: comment.userId.firstName,
      lastName: comment.userId.lastName,
    }
  }
}

  async getCommentsByVideoId(videoId: string, page : number, limit : number): Promise<{comments : CommentResponseDto[],totalCount : number}> {
  const {comments, totalCount }= await this.commentRepository.findByVideoId(videoId, page,limit);
  return {
    comments : comments.map((comment) => ({
    _id: comment._id.toString(),
    content: comment.content,
    createdAt: comment.createdAt,
    videoId: comment.videoId.toString(),
    userId: {
      _id: comment.userId._id.toString(),
      firstName: comment.userId.firstName,
      lastName: comment.userId.lastName,
    }
  })),
  totalCount
  } 
  }
}
