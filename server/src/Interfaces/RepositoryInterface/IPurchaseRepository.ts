
import { CreatePurchaseDto } from '../../dto/PurchaseDto';
import Purchase, { IPurchase } from '../../entities/Purchase';
import { BaseRepository } from '../../repositories/BaseRepoImpl';


export interface IPurchaseRepository {

   create(purchaseData: CreatePurchaseDto): Promise<IPurchase> 

   findByUserAndVideo(userId: string, videoId: string): Promise<IPurchase | null> 

   hasPurchased(userId: string, videoId: string): Promise<boolean> 
}