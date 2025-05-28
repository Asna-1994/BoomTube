import express from 'express'
import { purchaseController } from '../controllers/PurchaseController'
import { protect } from '../middlewares/authMiddleware';

const router = express.Router()

router.use(protect)
router.post('/:videoId',  (req, res, next) => 
  purchaseController.purchaseVideo(req, res, next)
);

// Get user purchases
router.get('/my-purchases',  (req, res, next) => 
  purchaseController.getUserPurchases(req, res, next)
);

export default router