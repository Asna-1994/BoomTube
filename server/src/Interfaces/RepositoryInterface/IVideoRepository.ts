
import { CreateVideoDto } from '../../dto/VideoDto';
import mongoose from 'mongoose';
import { BaseRepository } from '../../repositories/BaseRepoImpl';
import { IVideo, IVideoPopulated } from '../../entities/Video';

export interface IVideoRepository {

 create(videoData: CreateVideoDto): Promise<IVideo> 

  findAllWithPagination(page: number, limit: number): Promise<IVideoPopulated[]> 

  findById(id: string): Promise<IVideoPopulated | null> 
 findByCreator(creatorId: string): Promise<IVideoPopulated[]> 

 getTotalCount(): Promise<number>
}
 