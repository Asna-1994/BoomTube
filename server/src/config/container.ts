import { CommentService } from './../services/CommentService';
import { GiftRepository } from './../repositories/GiftRepository';
import { CommentRepository } from './../repositories/CommentRepository';
import { PurchaseRepository } from './../repositories/PurchaseRepository';
import { VideoRepository } from './../repositories/VideoRepository';




import { UserRepository } from "../repositories/UserRepoImpl";
import { AuthServiceImpl } from "../services/AuthServiceImpl";
import { UserService } from '../services/UserServieImpl';

import { VideoService } from '../services/VideoService';
import { PurchaseService } from '../services/PurchaseService';
import { GiftService } from '../services/GiftService';


export const userRepository = new UserRepository();
export const authService = new AuthServiceImpl(userRepository);

export const videoRepository = new VideoRepository()
export const purchaseRepository  = new PurchaseRepository()
export const commentRepository = new CommentRepository()
export const giftRepository = new GiftRepository()







export const userService =  new UserService(userRepository)

export const videoService = new VideoService(videoRepository,purchaseRepository )

export const purchaseService = new PurchaseService(videoRepository,purchaseRepository, userRepository)

export const giftService = new GiftService(giftRepository,videoRepository, userRepository)
export const commentService = new CommentService(commentRepository, videoRepository)


