import { CreateVideoDto, VideoResponseDto } from "../../dto/VideoDto"
import { IVideo } from "../../entities/Video"





export interface IVideoService {
  createVideo(videoData: CreateVideoDto) : Promise<IVideo>
  getFeedVideos(page: number, limit: number , userId?: string): Promise<VideoResponseDto[]>
  getVideoById(videoId: string, userId?: string): Promise<VideoResponseDto> 
  


}