import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';

import { STATUSCODE } from '../constants/StatusCodes';
import { purchaseService } from '../config/container';

export class PurchaseController {


  async purchaseVideo(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { videoId } = req.params;

      const userId = req.user._id.toString();

      const result = await purchaseService.purchaseVideo({
        userId,
        videoId,
        amount: 0, 
      });

      res.status(STATUSCODE.CREATED).json({
        success: true,
        message: 'Video purchased successfully',
        purchase: result.purchase,
        remainingBalance: result.remainingBalance,
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserPurchases(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user._id.toString();
      const purchases = await purchaseService.getUserPurchases(userId);

      res.status(STATUSCODE.OK).json({
        success: true,
        purchases,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const purchaseController  = new PurchaseController()