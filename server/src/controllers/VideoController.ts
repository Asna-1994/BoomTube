import { Request, Response, NextFunction } from 'express';
import { uploadToCloudinary } from '../config/cloudinaryConfig';
import { STATUSCODE } from '../constants/StatusCodes';
import { CustomError } from '../middlewares/errorHandler';

import { AuthRequest } from '../middlewares/authMiddleware';
import { CreateVideoDto } from '../dto/VideoDto';
import { videoService } from '../config/container';


export class VideoController {

  async uploadVideo(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { title, description, type, videoUrl, price } = req.body;
      console.log('videoUrl' ,videoUrl)
      const userId = req.user._id;

      let videoData: CreateVideoDto = {
        title,
        description,
       type,
        creator: userId,
      };

      if (type === 'short') {
        const file = req.file;
        if (!file) {
          throw new CustomError('Video file is required for short-form videos.', STATUSCODE.BAD_REQUEST);
        }
  
        const uploaded = await uploadToCloudinary(file.path, 'videos/shorts');
    
        videoData.videoFile = uploaded;
      } else if (type === 'long') {
        if (!videoUrl || !price) {
          throw new CustomError('Video URL and price are required for long-form videos.', STATUSCODE.BAD_REQUEST);
        }
        videoData.videoUrl = videoUrl;
        videoData.price = parseFloat(price);
      } else {
        throw new CustomError('Invalid video type', STATUSCODE.BAD_REQUEST);
      }

      const video = await videoService.createVideo(videoData);

      res.status(STATUSCODE.CREATED).json({
        success: true,
        video,
      });
    } catch (error) {
      next(error);
    }
  }


    async getFeed(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const userId = req.user?._id?.toString();

      const videos = await videoService.getFeedVideos(page, limit, userId);

      res.status(STATUSCODE.OK).json({
        success: true,
        videos,
        page,
        limit,
      });
    } catch (error) {
      next(error);
    }
  }

  async getVideoById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { videoId } = req.params;
      const userId = req.user?._id?.toString();

      const video = await videoService.getVideoById(videoId, userId);

      res.status(STATUSCODE.OK).json({
        success: true,
        video,
      });
    } catch (error) {
      next(error);
    }
  }
}


export const videoController = new VideoController();