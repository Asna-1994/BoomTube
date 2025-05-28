  export interface CreateVideoDto {
    title: string;
    description: string;
  type : 'short' | 'long';
  videoUrl? : string;
  price? : number;
  videoFile? : {
      url :string  | '';
      publicId : string | ''
    }
    creator : string;

  }

  export interface VideoResponseDto {
  _id: string;
  title: string;
  description?: string;
  type: 'short' | 'long';
  videoUrl?:  string ;
  videoFile? : {
      url :string  | '';
      publicId : string | ''
    }
  thumbnailUrl?: string;
  price: number;
  creator: {
    _id: string;
    firstName: string;
    lastName  : string;
  };
  createdAt: Date;
  isPurchased?: boolean;
}