
import { Route, Routes } from 'react-router-dom'
import CreateVideo from '../Pages/Videos/CreateVideos'
import VideoPlayer from '../Pages/Videos/VideoPlayer'




const VideoRoutes = () => {

  return (
  <Routes>
    <Route path='upload' element={<CreateVideo/>} />
    {/* <Route path='my-articles' element={<MyArticles/>} />
    <Route path=':articleId' element={<ArticleDetails/>}/> */}
    <Route path='watch/:videoId' element={<VideoPlayer/>} />
  </Routes>
  )
}

export default VideoRoutes
