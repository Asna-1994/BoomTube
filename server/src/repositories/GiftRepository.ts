
import { CreateGiftDto } from '../dto/GiftDto';
import Gift, { IGift } from '../entities/Gift';
import { IGiftRepository } from '../Interfaces/RepositoryInterface/IGiftRepository';


export class GiftRepository  implements IGiftRepository {
  constructor() {

  }
  async create(giftData: CreateGiftDto): Promise<IGift> {
    const gift = new Gift({
      senderId: giftData.senderId,
      creatorId: giftData.creatorId,
      videoId: giftData.videoId,
      amount: giftData.amount,
    });
    return await gift.save();
  }

  async findByVideoId(videoId: string): Promise<IGift[]> {
    return await Gift.find({videoId })
      .populate('senderId', 'firstName lastName')
      .populate('creatorId', 'firstName lastName')
      .sort({ createdAt: -1 })
      .exec();
  }

  async findBySenderId(senderId: string): Promise<IGift[]> {
    return await Gift.find({  senderId })
      .populate('creatorId', 'firstName lastName')
      .populate('videoId', 'title')
      .sort({ createdAt: -1 })
      .exec();
  }

  async findByCreatorId(creatorId: string): Promise<IGift[]> {
    return await Gift.find({ creatorId })
      .populate('senderId', 'firstName lastName')
      .populate('videoId', 'title')
      .sort({ createdAt: -1 })
      .exec();
  }
}