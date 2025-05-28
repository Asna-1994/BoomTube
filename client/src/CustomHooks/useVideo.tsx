import { Video } from "../Pages/DashBoard/Dashboard";
import { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../Redux/store';
import { getAllVideos } from "../services/videoService";
import axiosInstance from "../Instance/axiosInstance";
import toast from "react-hot-toast";

interface UseVideoHook {
  videos: Video[];
  isLoading: boolean;
     currentPage : number;
  fetchVideos: (page: number) => void;
  buyVideo: (videoId: string) => Promise<void>;
  watchVideo: (video: Video) => void;
  lastVideoRef: React.RefCallback<HTMLDivElement>;
  selectedVideo : Video | null
  showModal : boolean
  setSelectedVideo : (video : Video) => void
  setShowModal : (isSelected : boolean) => void
}

const PAGE_SIZE = 10;

export default function useVideo(): UseVideoHook {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Fetch videos from API
  const fetchVideos = useCallback(async (page: number) => {
    if (!isAuthenticated || isLoading || !hasMore) return;
    setIsLoading(true);
    try {
      const res = await getAllVideos(page, PAGE_SIZE)

      const newVideos = res.data.videos;
            console.log(newVideos)
         setVideos(prev => {
        const merged = [...prev, ...newVideos];
        const deduped = Array.from(
          new Map(merged.map(v => [v._id, v])).values()
        );
        return deduped;
      });
      if (newVideos.length < PAGE_SIZE) setHasMore(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, isLoading, hasMore]);

  // Intersection Observer for infinite scroll
const observer = useRef<IntersectionObserver | null>(null); 
  const lastVideoRef = useCallback((node: HTMLDivElement) => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setCurrentPage(prev => prev + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [isLoading, hasMore]);

useEffect(() => {
  if (isAuthenticated) fetchVideos(currentPage);
}, [currentPage]);

  // Purchase video
  const buyVideo = async (videoId: string) => {
    try {
     const response =  await axiosInstance.post(`/purchase/${videoId}`);
     if(response.data.success){
      toast.success('Purchase Successful')
      setVideos(prev =>
        prev.map(v =>
          v._id === videoId ? { ...v, isPurchased: true } : v
        )
      );
     }else{
      toast.error(response.data.message)
     }

    } catch (err : any) {
      console.error(err);
           toast.error(err.response.data.message || 'Purchase failed' )

    }
  };

  // Watch video
  const watchVideo = (video : Video) => {
    navigate(`/videos/watch/${video._id}`, { state: { video } });
  };

  return {
    videos,
    isLoading,
       currentPage,
    fetchVideos,
    buyVideo,
    watchVideo,
    lastVideoRef,
     selectedVideo,
      setSelectedVideo,
 showModal,
  setShowModal


  };
}
