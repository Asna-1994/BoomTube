import { CreateVideoDto, VideoResponseDto } from '../dto/VideoDto';
import { CustomError } from '../middlewares/errorHandler';
import { STATUSCODE } from '../constants/StatusCodes';
import { IVideoService } from '../Interfaces/ServiceInterface/IVideoService';
import { VideoRepository } from '../repositories/VideoRepository';
import { PurchaseRepository } from '../repositories/PurchaseRepository';
import { IVideo } from '../entities/Video';

export class VideoService implements IVideoService{
  constructor(
    private videoRepository: VideoRepository,
    private purchaseRepository: PurchaseRepository
  ) {}

  async createVideo(videoData: CreateVideoDto):Promise<IVideo> {
    try {
      const video = await this.videoRepository.create(videoData);
      return video;
    } catch (error) {
      throw new CustomError('Failed to create video', STATUSCODE.INTERNAL_SERVER_ERROR);
    }
  }

  async getFeedVideos(page: number = 1, limit: number = 10, userId?: string): Promise<VideoResponseDto[]> {
    try {
      const videos = await this.videoRepository.findAllWithPagination(page, limit)
      
      const videosWithPurchaseStatus = await Promise.all(
        videos.map(async (video) => {
          let isPurchased = false;
          
          if (userId && video.type === 'long' && video.price > 0) {
            isPurchased = await this.purchaseRepository.hasPurchased(userId, video._id.toString());
          }
          
          return {
            _id: video._id.toString(),
            title: video.title,
            description: video.description,
            type: video.type,
            videoUrl: video.videoUrl,
              videoFile : {
  url: video.videoFile?.url ?? '',
  publicId: video.videoFile?.publicId ?? ''
    },
            thumbnailUrl: video.thumbnailUrl,
            price: video.price,
            creator: {
              _id: video.creator._id.toString(),
              firstName: video.creator.firstName,
              lastName : video.creator.lastName
            },
            createdAt: video.createdAt,
            isPurchased,
          }
        })
      );
      
      return videosWithPurchaseStatus;
    } catch (error) {
      throw new CustomError('Failed to fetch videos', STATUSCODE.INTERNAL_SERVER_ERROR);
    }
  }

  async getVideoById(videoId: string, userId?: string): Promise<VideoResponseDto> {
    try {
      const video = await this.videoRepository.findById(videoId);
      if (!video) {
        throw new CustomError('Video not found', STATUSCODE.NOT_FOUND);
      }

      let isPurchased = false;
      if (userId && video.type === 'long' && video.price > 0) {
        isPurchased = await this.purchaseRepository.hasPurchased(userId, videoId);
      }

      return {
        _id: video._id.toString(),
        title: video.title,
        description: video.description,
        type: video.type,
        videoUrl: video.videoUrl,
              videoFile : {
    url: video.videoFile?.url ?? '',
  publicId: video.videoFile?.publicId ?? ''
    },
        thumbnailUrl: video.thumbnailUrl,
        price: video.price,
        creator: {
          _id: video.creator._id.toString(),
         firstName: video.creator.firstName,
        lastName : video.creator.lastName,
        },
        createdAt: video.createdAt,
        isPurchased,
      };
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new CustomError('Failed to fetch video', STATUSCODE.INTERNAL_SERVER_ERROR);
    }
  }
}