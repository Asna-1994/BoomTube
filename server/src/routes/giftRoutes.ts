import express from 'express'
import { giftController } from '../controllers/GiftController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router()
router.use(protect)
// Send gift
router.post('/:videoId',  (req, res, next) => 
  giftController.sendGift(req, res, next)
);



export default router