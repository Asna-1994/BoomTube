
import { CreateVideoDto } from '../dto/VideoDto';
import Video, { IVideo, IVideoPopulated } from '../entities/Video';
import { IVideoRepository } from '../Interfaces/RepositoryInterface/IVideoRepository';

export class VideoRepository  implements IVideoRepository {
  constructor() {}
  async create(videoData: CreateVideoDto): Promise<IVideo> {
    const video = new Video({
    ...videoData
    });
    return await video.save();
  }

  async findAllWithPagination(page: number = 1, limit: number = 10): Promise<IVideoPopulated[]> {
    const skip = (page - 1) * limit;
    const videos =  await Video.find()
      .populate('creator', 'firstName lastName')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();
    return videos as unknown as IVideoPopulated[];
  }

  async findById(id: string): Promise<IVideoPopulated | null> {
   const video =  await Video.findById(id).populate('creator', 'firstName lastName').exec();
 return video as unknown as IVideoPopulated;
  }

  async findByCreator(creatorId: string): Promise<IVideoPopulated[]> {
    const videos =  await Video.find({ creator: creatorId })
      .populate('creator', 'firstName lastName')
      .sort({ createdAt: -1 })
        .lean()
      .exec();

  return videos as unknown as IVideoPopulated[];
  }

  async getTotalCount(): Promise<number> {
    return await Video.countDocuments();
  }
}