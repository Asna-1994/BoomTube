
import { CreatePurchaseDto } from '../dto/PurchaseDto';
import Purchase, { IPurchase } from '../entities/Purchase';
import { IPurchaseRepository } from '../Interfaces/RepositoryInterface/IPurchaseRepository';


export class PurchaseRepository  implements IPurchaseRepository {
  constructor() {

  }
  async create(purchaseData: CreatePurchaseDto): Promise<IPurchase> {
    const purchase = new Purchase({
      userId: purchaseData.userId,
      videoId: purchaseData.videoId,
      amount: purchaseData.amount,
    });
    return await purchase.save();
  }

  async findByUserAndVideo(userId: string, videoId: string): Promise<IPurchase | null> {
    return await Purchase.findOne({ userId,  videoId }).exec();
  }

  async findByUserId(userId: string): Promise<IPurchase[]> {
    return await Purchase.find({userId})
      .populate('video', 'title type creator')
      .sort({ createdAt: -1 })
      .lean()
      .exec();
  }

  async hasPurchased(userId: string, videoId: string): Promise<boolean> {
    const purchase = await this.findByUserAndVideo(userId, videoId);
    return !!purchase;
  }
}