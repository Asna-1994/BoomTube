import express  from 'express';
import { protect } from '../middlewares/authMiddleware';
import { upload } from '../config/cloudinaryConfig';
import { videoController, VideoController } from '../controllers/VideoController';



const router = express.Router()

// router.get('/:article-id', articleController.getArticle)


router.use(protect)


router.post('/upload',upload.single('videoFile'), videoController.uploadVideo)
router.get('/feeds',  videoController.getFeed)
router.get('/:videoId', videoController.getVideoById)




export default router