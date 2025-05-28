
import { CreateGiftDto } from '../../dto/GiftDto';
import Gift, { IGift } from '../../entities/Gift';
import { BaseRepository } from '../../repositories/BaseRepoImpl';


export interface IGiftRepository {

  create(giftData: CreateGiftDto): Promise<IGift> 

  findByVideoId(videoId: string): Promise<IGift[]>

  findBySenderId(senderId: string): Promise<IGift[]> 

  findByCreatorId(creatorId: string): Promise<IGift[]> 
}