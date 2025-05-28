

import { CustomError } from '../middlewares/errorHandler';
import { STATUSCODE } from '../constants/StatusCodes';
import { IPurchase } from '../entities/Purchase';
import { IPurchaseService } from '../Interfaces/ServiceInterface/IPurchaseService';
import { VideoRepository } from '../repositories/VideoRepository';
import { PurchaseRepository } from '../repositories/PurchaseRepository';
import { UserRepository } from '../repositories/UserRepoImpl';


export class PurchaseService implements IPurchaseService {



  constructor(    private videoRepository: VideoRepository,
      private purchaseRepository: PurchaseRepository,
    private userRepository : UserRepository) {

  }
  async purchaseVideo({ userId, videoId, amount }: { userId: string; videoId: string; amount: number }) :Promise<{purchase :IPurchase, remainingBalance : number | null}>{
    const video = await this.videoRepository.findById(videoId);
    if (!video) {
      throw new CustomError('Video not found', STATUSCODE.NOT_FOUND);
    }

    // If video is free or already purchased, skip payment
    if (video.price === 0) {
      const alreadyPurchased = await this.purchaseRepository.findByUserAndVideo(userId, videoId);
      if (!alreadyPurchased) {
        const freePurchase = await this.purchaseRepository.create({ userId: userId, videoId: videoId, amount: 0 });
        return { purchase: freePurchase, remainingBalance: null };
      } else {
        throw new CustomError('Video already purchased', STATUSCODE.BAD_REQUEST);
      }
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new CustomError('User not found', STATUSCODE.NOT_FOUND);
    }

    const alreadyPurchased = await this.purchaseRepository.findByUserAndVideo(userId, videoId);
    if (alreadyPurchased) {
      throw new CustomError('Video already purchased', STATUSCODE.BAD_REQUEST);
    }

    if (user.wallet < video.price) {
      throw new CustomError('Insufficient wallet balance', STATUSCODE.BAD_REQUEST);
    }

    // Deduct price
    user.wallet -= video.price;
    await user.save();

    // Save purchase
    const purchase = await this.purchaseRepository.create({
      userId: userId,
      videoId: videoId,
      amount: video.price,
    });

    return {
      purchase,
      remainingBalance: user.wallet,
    };
  }

  async getUserPurchases(userId: string) :Promise<IPurchase[]>{
    const purchases = await this.purchaseRepository.findByUserId(userId)
    return purchases;
  }
}
