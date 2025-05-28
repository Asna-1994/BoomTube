import { CommentResponseDto } from "../../dto/CommentDto";
import { IComment } from "../../entities/Comments";


export interface ICommentService {
  createComment(params: {
    content: string;
    userId: string;
    videoId: string;
  }): Promise<CommentResponseDto>;

  getCommentsByVideoId(videoId: string ,page : number ,limit:number): Promise<{comments : CommentResponseDto[],totalCount : number}>;
}
