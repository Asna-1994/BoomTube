import { IGift } from '../../entities/Gift';
import { IUser } from '../../entities/User';

export interface IGiftService {
  sendGift(params: { senderId: string; videoId: string; amount: number }): Promise<{ gift: IGift; sender: IUser }>;

}
