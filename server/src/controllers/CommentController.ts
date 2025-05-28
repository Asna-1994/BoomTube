import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import { STATUSCODE } from '../constants/StatusCodes';
import { CustomError } from '../middlewares/errorHandler';
import { commentService } from '../config/container';

export class CommentController {


  async createComment(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { content } = req.body;
      const { videoId } = req.params;
      const userId = req.user._id.toString();

      if (!content || content.trim().length === 0) {
        throw new CustomError('Comment content is required', STATUSCODE.BAD_REQUEST);
      }

      const comment = await commentService.createComment({
        content: content.trim(),
        userId,
        videoId,
      });

    
      res.status(STATUSCODE.CREATED).json({
        success: true,
        comment,
      });
    } catch (error) {
      next(error);
    }
  }

  async getCommentsByVideo(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { videoId } = req.params;
          const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
      const {comments ,totalCount}= await commentService.getCommentsByVideoId(videoId, page, limit);

      res.status(STATUSCODE.OK).json({
        success: true,
        comments,
        page,
        limit,
        totalCount
      });
    } catch (error) {
      next(error);
    }
  }
}
export const commentController  = new CommentController()