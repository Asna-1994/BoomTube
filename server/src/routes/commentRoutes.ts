import { Router } from 'express';
import { commentController } from '../controllers/CommentController';
import { protect } from '../middlewares/authMiddleware';


const router = Router();
router.use(protect)
// Create comment
router.post('/:videoId', commentController.createComment);

// Get comments by video
router.get('/:videoId', commentController.getCommentsByVideo);

export default router;