import { CreateCommentDto } from "../../dto/CommentDto"
import { IComment, ICommentPopulated } from "../../entities/Comments"
import { BaseRepository } from "../../repositories/BaseRepoImpl"



export interface ICommentRepository {


create(commentData: CreateCommentDto): Promise<ICommentPopulated> 

  findByVideoId(videoId: string ,page : number, limit:number): Promise<{comments : ICommentPopulated[], totalCount :number}> 

  findById(id: string): Promise<ICommentPopulated | null> 

  deleteById(id: string): Promise<boolean> 
}
 