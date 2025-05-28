import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';

import { STATUSCODE } from '../constants/StatusCodes';
import { CustomError } from '../middlewares/errorHandler';
import { giftService } from '../config/container';

export class GiftController {


  async sendGift(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { amount } = req.body;
      const { videoId } = req.params;
      const senderId = req.user._id.toString();

      if (!amount || amount <= 0) {
        throw new CustomError('Invalid gift amount', STATUSCODE.BAD_REQUEST);
      }

      const {gift, sender} = await giftService.sendGift({
        senderId,
        creatorId: '', // Will be determined by video
        videoId,
        amount: parseFloat(amount),
      });

      res.status(STATUSCODE.CREATED).json({
        success: true,
        message: 'Gift sent successfully',
        gift,
       sender,
      });
    } catch (error) {
      next(error);
    }
  }


}

export const giftController  = new GiftController()