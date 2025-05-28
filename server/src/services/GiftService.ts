import { IGift } from '../entities/Gift';

import { GiftRepository } from '../repositories/GiftRepository';
import { VideoRepository } from '../repositories/VideoRepository';
import { UserRepository } from '../repositories/UserRepoImpl';
import { CustomError } from '../middlewares/errorHandler';
import { STATUSCODE } from '../constants/StatusCodes';
import { IGiftService } from '../Interfaces/ServiceInterface/IGiftService';
import { IUser } from '../entities/User';

interface SendGiftDTO {
  senderId: string;
  creatorId: string;
  videoId: string;
  amount: number;
}

export class GiftService implements IGiftService {
  constructor(
    private giftRepository: GiftRepository,
    private videoRepository: VideoRepository,
    private userRepository: UserRepository
  ) {}

  async sendGift({ senderId, videoId, amount }: SendGiftDTO): Promise<{ gift: IGift; sender : IUser }> {
    const video = await this.videoRepository.findById(videoId);
    if (!video) {
      throw new CustomError('Video not found', STATUSCODE.NOT_FOUND);
    }

    const creatorId = video.creator._id.toString()

    const sender = await this.userRepository.findById(senderId);
    if (!sender) {
      throw new CustomError('Sender not found', STATUSCODE.NOT_FOUND);
    }

    if (sender.wallet < amount) {
      throw new CustomError('Insufficient wallet balance', STATUSCODE.BAD_REQUEST);
    }

    // Deduct from sender
    sender.wallet -= amount;
    await sender.save();

    // Add to creator
    const creator = await this.userRepository.findById(creatorId);
    if (!creator) {
      throw new CustomError('Creator not found', STATUSCODE.NOT_FOUND);
    }

    creator.wallet += amount;
    await creator.save();

    // Save gift
    const gift = await this.giftRepository.create({
      senderId: senderId,
      creatorId: creatorId,
      videoId: videoId,
      amount: amount,
    });

    return {
      gift,
      sender,
    };
  }


}
