export interface CreateCommentDto {
  content: string;
  userId: string;
  videoId: string;
}

export interface CommentResponseDto {
  _id: string;
  content: string;
  userId: {
    _id: string;
    firstName : string;
    lastName : string;
  };
  createdAt: Date;
  videoId : string;
}