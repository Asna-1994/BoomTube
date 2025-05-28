





import { IPurchase } from "../../entities/Purchase"






export interface IPurchaseService {
 getUserPurchases(userId: string) : Promise<IPurchase[]>
purchaseVideo({ userId, videoId, amount }: { userId: string; videoId: string; amount: number }) : Promise<{purchase :IPurchase, remainingBalance : number | null}>


  


}